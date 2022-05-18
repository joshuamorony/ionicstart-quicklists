import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { ChecklistService } from './checklist.service';

describe('ChecklistService', () => {
  let service: ChecklistService;

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

  describe('add()', () => {
    it('should add to existing checklists and emit on checklists$', () => {
      const testChecklist = { title: 'hello' };
      const observerSpy = subscribeSpyTo(service.getChecklists());

      service.add(testChecklist);

      expect(observerSpy.getLastValue().includes(testChecklist)).toBe(true);
    });
  });
});
