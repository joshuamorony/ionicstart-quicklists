import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { ChecklistItemService } from './checklist-item.service';

describe('ChecklistItemService', () => {
  let service: ChecklistItemService;

  const testChecklistId = '1';
  const testItem = {
    title: 'hello',
  };

  const testChecklistIdTwo = '2';
  const testItemTwo = {
    title: 'goodbye',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistItemService);

    service.add(testItem, testChecklistId);
    service.add(testItemTwo, testChecklistIdTwo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItemsByChecklistId()', () => {
    it('should emit items for specific checklist', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistIdTwo)
      );
      expect(observerSpy.getLastValue()[0].title).toEqual(testItemTwo.title);
    });

    it('should emit empty array if no items exist for checklist', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId('noitems')
      );
      expect(observerSpy.getLastValue()).toEqual([]);
    });
  });

  describe('add()', () => {
    it('should create item and emit for that checklist id', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      expect(
        observerSpy
          .getLastValue()
          .find((checklist) => checklist.title === testItem.title)
      ).toBeTruthy();
    });
  });

  describe('toggle()', () => {
    it('should toggle the checked state for the item id', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      const item = observerSpy.getLastValue()[0];
      const checkedStateBefore = item.checked;

      service.toggle(item.id);

      const checkedStateAfter = observerSpy.getLastValue()[0].checked;

      expect(checkedStateBefore).toEqual(!checkedStateAfter);
    });
  });

  describe('reset()', () => {
    it('should reset the checked state for all items', () => {
      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      const itemsBefore = observerSpy.getLastValue();

      itemsBefore.forEach((item) => {
        service.toggle(item.id);
      });

      service.reset(testChecklistId);

      const itemsAfter = observerSpy.getLastValue();

      itemsAfter.forEach((item) => {
        expect(item.checked).toBe(false);
      });
    });
  });
});
