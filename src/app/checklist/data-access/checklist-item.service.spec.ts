import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { combineLatest, of } from 'rxjs';
import { StorageService } from '../../shared/data-access/storage.service';

import { ChecklistItemService } from './checklist-item.service';

jest.mock('../../shared/data-access/storage.service');

describe('ChecklistItemService', () => {
  let service: ChecklistItemService;
  let storageService: StorageService;

  const testChecklistId = '1';
  const testItem = {
    id: '1',
    title: 'hello',
  };

  const testChecklistIdTwo = '2';
  const testItemTwo = {
    id: '2',
    title: 'goodbye',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(ChecklistItemService);
    storageService = TestBed.inject(StorageService);

    service.add(testItem, testChecklistId);
    service.add(testItemTwo, testChecklistIdTwo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load()', () => {
    it('should trigger result from loadChecklistItems from storage service to emit on checklistItems$', () => {
      const testLoadData = [
        { id: 'xyz', checklistId: '1', title: 'abc', checked: false },
      ];

      storageService.loadChecklistItems$ = of(testLoadData);

      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testLoadData[0].checklistId)
      );
      service.load();

      expect(observerSpy.getLastValue()).toEqual(testLoadData);
    });
  });

  describe('getItemsByChecklistId()', () => {
    it('should emit items for specific checklist', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistIdTwo)
      );
      expect((observerSpy.getLastValue() as any)[0].title).toEqual(
        testItemTwo.title
      );
    });

    it('should emit empty array if no items exist for checklist', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId('noitems')
      );
      expect(observerSpy.getLastValue()).toEqual([]);
    });

    it('should pass checklist item data to saveChecklistItems method of storage service when it emits', () => {
      const observerSpy = subscribeSpyTo(
        combineLatest([
          service.getItemsByChecklistId(testChecklistId),
          service.getItemsByChecklistId(testChecklistIdTwo),
        ])
      );

      const data = [
        ...(observerSpy.getLastValue() as any)[0],
        ...(observerSpy.getLastValue() as any)[1],
      ];

      expect(storageService.saveChecklistItems).toHaveBeenLastCalledWith(data);
    });
  });

  describe('add()', () => {
    it('should create item and emit for that checklist id', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      expect(
        (observerSpy.getLastValue() as any).find(
          (checklist: any) => checklist.title === testItem.title
        )
      ).toBeTruthy();
    });
  });

  describe('toggle()', () => {
    it('should toggle the checked state for the item id', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      const item = (observerSpy.getLastValue() as any)[0];
      const checkedStateBefore = item.checked;

      service.toggle(item.id);

      const checkedStateAfter = (observerSpy.getLastValue() as any)[0].checked;

      expect(checkedStateBefore).toEqual(!checkedStateAfter);
    });
  });

  describe('reset()', () => {
    it('should reset the checked state for all items', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      const itemsBefore = observerSpy.getLastValue() as any;

      itemsBefore.forEach((item: any) => {
        service.toggle(item.id);
      });

      service.reset(testChecklistId);

      const itemsAfter = observerSpy.getLastValue() as any;

      itemsAfter.forEach((item: any) => {
        expect(item.checked).toBe(false);
      });
    });
  });

  describe('removeAllItemsForChecklist()', () => {
    it('should remove all items matching given checklist id', () => {
      service.add(testItem, testChecklistId);
      service.add(testItem, testChecklistId);

      service.removeAllItemsForChecklist(testChecklistId);

      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      expect(observerSpy.getLastValue()).toEqual([]);
    });
  });

  describe('remove()', () => {
    it('should remove item matching id', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      const items = observerSpy.getLastValue() as any;
      const itemToRemove = items[0];

      service.remove(itemToRemove.id);

      expect(
        observerSpy.getLastValue()?.find((item) => item.id === itemToRemove.id)
      ).toBe(undefined);
    });
  });

  describe('update()', () => {
    const formData = { title: 'new title' };

    it('should update the title to the new value supplied for the checklist item id supplied', () => {
      service.add(testItem, testChecklistId);

      service.update(testItem.id, formData);

      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      expect(
        observerSpy.getLastValue()?.find((item) => item.id === testItem.id)
          ?.title
      ).toEqual(formData.title);
    });

    it('should not update a checklist that does not match the id supplied', () => {
      service.add(testItem, testChecklistId);

      service.update(testItem.id, formData);

      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistIdTwo)
      );

      expect(
        observerSpy.getLastValue()?.find((item) => item.id === testItem.id)
          ?.title
      ).not.toEqual(formData.title);
    });
  });
});
