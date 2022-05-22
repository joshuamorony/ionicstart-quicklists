import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { ChecklistItemService } from './checklist-item.service';

describe('ChecklistItemService', () => {
  let service: ChecklistItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItemsByChecklistId()', () => {
    const testChecklistIdOne = '1';
    const testItemOne = {
      title: 'hello',
    };

    const testChecklistIdTwo = '2';
    const testItemTwo = {
      title: 'goodbye',
    };

    beforeEach(() => {
      service.add(testItemOne, testChecklistIdOne);
      service.add(testItemTwo, testChecklistIdTwo);
    });

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
      const testChecklistId = '1';

      const testItem = {
        title: 'hello',
      };

      const observerSpy = subscribeSpyTo(
        service.getItemsByChecklistId(testChecklistId)
      );

      service.add(testItem, testChecklistId);

      expect(
        observerSpy
          .getLastValue()
          .find((checklist) => checklist.title === testItem.title)
      ).toBeTruthy();
    });
  });
});
