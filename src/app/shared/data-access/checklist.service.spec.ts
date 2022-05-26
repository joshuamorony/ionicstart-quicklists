import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ChecklistItemService } from '../../checklist/data-access/checklist-item.service';

import { ChecklistService } from './checklist.service';
import { StorageService } from './storage.service';

jest.mock('./storage.service');
jest.mock('../../checklist/data-access/checklist-item.service');

describe('ChecklistService', () => {
  let service: ChecklistService;
  let storageService: StorageService;
  let checklistItemService: ChecklistItemService;

  const testChecklistOne = {
    id: 'abc',
    title: 'abc',
  };

  const testChecklistTwo = {
    id: '123',
    title: '123',
  };

  const testLoadData = [{ id: 'xyz', title: 'abc' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            loadChecklists: jest.fn().mockResolvedValue(testLoadData),
            saveChecklists: jest.fn(),
          },
        },
        ChecklistItemService,
      ],
    });
    service = TestBed.inject(ChecklistService);
    storageService = TestBed.inject(StorageService);
    checklistItemService = TestBed.inject(ChecklistItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load()', () => {
    it('should trigger result from loadChecklists from storage service to emit on getChecklists()', async () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());
      await service.load();

      expect(observerSpy.getLastValue()).toEqual(testLoadData);
    });
  });

  describe('getChecklists()', () => {
    it('should emit empty array initially', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());
      expect(observerSpy.getLastValue()).toEqual([]);
    });

    it('should pass checklist data to saveChecklists method of storage service when it emits', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());
      service.add(testChecklistOne);

      const checklists = observerSpy.getLastValue();

      expect(storageService.saveChecklists).toHaveBeenCalledWith(checklists);
    });
  });

  describe('getChecklistById()', () => {
    it('should return the checklist matching the id', () => {
      service.add(testChecklistOne);
      service.add(testChecklistTwo);

      const result = service.getChecklistById(testChecklistTwo.id);
      const observerSpy = subscribeSpyTo(result);

      expect(observerSpy.getLastValue()).toEqual(testChecklistTwo);
    });
  });

  describe('add()', () => {
    const testChecklist = { title: 'Hello there' };

    it('should add to existing checklists and emit on checklists$', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());

      service.add(testChecklist);

      expect(
        (observerSpy.getLastValue() as any).find(
          (checklist: any) => checklist.title === testChecklist.title
        )
      ).toBeTruthy();
    });

    it('should create a slug based on the title and use it as the id', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());

      service.add(testChecklist);

      expect(
        (observerSpy.getLastValue() as any).find(
          (checklist: any) => checklist.title === testChecklist.title
        ).id
      ).toEqual('hello-there');
    });

    it('should not reuse the same slug if it is already in use', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());

      service.add(testChecklist);
      service.add(testChecklist);

      expect(
        (observerSpy.getLastValue() as any).filter(
          (checklist: any) => checklist.id === 'hello-there'
        ).length
      ).toEqual(1);
    });
  });

  describe('remove()', () => {
    it('should remove the checklist that matches the id', () => {
      service.add(testChecklistOne);

      service.remove(testChecklistOne.id);

      const observerSpy = subscribeSpyTo(
        service.getChecklistById(testChecklistOne.id)
      );

      expect(observerSpy.getLastValue()).toBe(undefined);
    });

    it('should call removeAllItemsForChecklist() method for the checklist being deleted', () => {
      service.add(testChecklistOne);
      service.remove(testChecklistOne.id);
      expect(
        checklistItemService.removeAllItemsForChecklist
      ).toHaveBeenCalledWith(testChecklistOne.id);
    });
  });

  describe('update()', () => {
    const formData = { title: 'new title' };

    it('should update the title to the new value supplied for the checklist id supplied', () => {
      service.add(testChecklistOne);

      service.update(testChecklistOne.id, formData);

      const observerSpy = subscribeSpyTo(
        service.getChecklistById(testChecklistOne.id)
      );

      expect(observerSpy.getLastValue()?.title).toEqual(formData.title);
    });

    it('should not update a checklist that does not match the id supplied', () => {
      service.add(testChecklistOne);

      service.update(testChecklistOne.id, formData);

      const observerSpy = subscribeSpyTo(
        service.getChecklistById(testChecklistTwo.id)
      );

      expect(observerSpy.getLastValue()?.title).not.toEqual(formData.title);
    });
  });
});
