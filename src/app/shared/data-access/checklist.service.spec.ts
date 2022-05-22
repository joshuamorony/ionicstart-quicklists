import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { ChecklistService } from './checklist.service';

describe('ChecklistService', () => {
  let service: ChecklistService;

  const testChecklistOne = {
    id: 'abc',
    title: 'abc',
  };

  const testChecklistTwo = {
    id: '123',
    title: '123',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getChecklists()', () => {
    it('should emit an empty array initially', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());
      expect(observerSpy.getLastValue()).toEqual([]);
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
        observerSpy
          .getLastValue()
          .find((checklist) => checklist.title === testChecklist.title)
      ).toBeTruthy();
    });

    it('should create a slug based on the title and use it as the id', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());

      service.add(testChecklist);

      expect(
        observerSpy
          .getLastValue()
          .find((checklist) => checklist.title === testChecklist.title).id
      ).toEqual('hello-there');
    });

    it('should not reuse the same slug if it is already in use', () => {
      const observerSpy = subscribeSpyTo(service.getChecklists());

      service.add(testChecklist);
      service.add(testChecklist);

      expect(
        observerSpy
          .getLastValue()
          .filter((checklist) => checklist.id === 'hello-there').length
      ).toEqual(1);
    });
  });
});
