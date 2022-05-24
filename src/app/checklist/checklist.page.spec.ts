import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';

import { ChecklistPage } from './checklist.page';
import { ChecklistItemService } from './data-access/checklist-item.service';
import { MockChecklistItemListComponent } from './ui/checklist-item-list/checklist-item-list.component.spec';

describe('ChecklistPage', () => {
  let component: ChecklistPage;
  let fixture: ComponentFixture<ChecklistPage>;

  const testChecklist = {
    id: 'hello',
    title: 'hello',
  };

  const testItems = [
    {
      id: '1',
      checklistId: testChecklist.id,
      checked: false,
      title: 'there',
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistPage, MockChecklistItemListComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: testChecklist.id,
              })
            ),
          },
        },
        {
          provide: ChecklistService,
          useValue: {
            getChecklistById: jest.fn().mockReturnValue(of(testChecklist)),
          },
        },
        {
          provide: ChecklistItemService,
          useValue: {
            add: jest.fn(),
            toggle: jest.fn(),
            reset: jest.fn(),
            getItemsByChecklistId: jest.fn().mockReturnValue(of(testItems)),
          },
        },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the toggle method of the checklist item service with the id of the item when toggle event emits', () => {
    const checklistItemService =
      fixture.debugElement.injector.get(ChecklistItemService);

    const itemList = fixture.debugElement.query(
      By.css('app-checklist-item-list')
    );
    itemList.triggerEventHandler('toggle', testItems[0].id);

    expect(checklistItemService.toggle).toHaveBeenCalledWith(testItems[0].id);
  });

  describe('vm$', () => {
    it('should combine the stream returned from getChecklistById for the id passed in through the route along with its items', () => {
      const checklistService =
        fixture.debugElement.injector.get(ChecklistService);

      const checklistItemService =
        fixture.debugElement.injector.get(ChecklistItemService);

      jest
        .spyOn(checklistService, 'getChecklistById')
        .mockReturnValue(of(testChecklist));

      jest
        .spyOn(checklistItemService, 'getItemsByChecklistId')
        .mockReturnValue(of(testItems));

      const observerSpy = subscribeSpyTo(component.vm$);

      expect(checklistService.getChecklistById).toHaveBeenCalledWith(
        testChecklist.id
      );

      expect(checklistItemService.getItemsByChecklistId).toHaveBeenCalledWith(
        testChecklist.id
      );

      expect(observerSpy.getLastValue()).toEqual({
        checklist: testChecklist,
        items: testItems,
      });
    });
  });

  describe('checklistItemForm', () => {
    it('should require a title field', () => {
      const titleControl = component.checklistItemForm.get('title') as any;

      titleControl.setValue('');

      expect(titleControl.valid).toBe(false);
    });
  });

  describe('addChecklistItem()', () => {
    it('should call the add() method of the ChecklistService with the form data', () => {
      const checklistItemService =
        fixture.debugElement.injector.get(ChecklistItemService);

      component.addChecklistItem(testChecklist.id);

      expect(checklistItemService.add).toHaveBeenCalledWith(
        component.checklistItemForm.value,
        testChecklist.id
      );
    });
  });

  describe('resetChecklistItems()', () => {
    it('should call the reset() method of the ChecklistItem service for the selected checklist', () => {
      const checklistItemService =
        fixture.debugElement.injector.get(ChecklistItemService);

      component.resetChecklistItems(testChecklist.id);

      expect(checklistItemService.reset).toHaveBeenCalledWith(testChecklist.id);
    });
  });
});
