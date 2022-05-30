import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
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
            remove: jest.fn(),
            toggle: jest.fn(),
            reset: jest.fn(),
            update: jest.fn(),
            getItemsByChecklistId: jest.fn().mockReturnValue(of(testItems)),
          },
        },
        FormBuilder,
        {
          provide: IonRouterOutlet,
          useValue: {},
        },
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

  describe('checklistItemIdBeingEdited$', () => {
    it('should be null initially', () => {
      const observerSpy = subscribeSpyTo(component.checklistItemIdBeingEdited$);
      expect(observerSpy.getLastValue()).toBe(null);
    });

    it('should emit checklist item id when edit is triggered', () => {
      const observerSpy = subscribeSpyTo(component.checklistItemIdBeingEdited$);

      const checklistItemList = fixture.debugElement.query(
        By.css('app-checklist-item-list')
      );

      checklistItemList.triggerEventHandler('edit', testItems[0]);

      expect(observerSpy.getLastValue()).toEqual(testItems[0].id);
    });

    it('should emit null when the modal is dismissed', () => {
      const modal = fixture.debugElement.query(By.css('ion-modal'));
      const observerSpy = subscribeSpyTo(component.checklistItemIdBeingEdited$);

      component.checklistItemIdBeingEdited$.next('1');

      modal.triggerEventHandler('ionModalDidDismiss', null);

      expect(observerSpy.getLastValue()).toBe(null);
    });
  });

  describe('formModalIsOpen$', () => {
    it('should emit true when add button is clicked', () => {
      const observerSpy = subscribeSpyTo(component.formModalIsOpen$);

      const addButton = fixture.debugElement.query(
        By.css('[data-test="add-checklist-item-button"]')
      );

      addButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toBe(true);
    });

    it('should emit true when edit is triggered', () => {
      const observerSpy = subscribeSpyTo(component.formModalIsOpen$);

      component.openEditModal({} as any);

      expect(observerSpy.getLastValue()).toBe(true);
    });

    it('should emit false when the modal is dismissed', () => {
      const observerSpy = subscribeSpyTo(component.formModalIsOpen$);
      component.formModalIsOpen$.next(true);

      const modal = fixture.debugElement.query(By.css('ion-modal'));
      modal.triggerEventHandler('ionModalDidDismiss', null);
      expect(observerSpy.getLastValue()).toBe(false);
    });
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

      expect(observerSpy.getLastValue()).toMatchObject({
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

  describe('deleteChecklistItem()', () => {
    it('should call the remove method of the ChecklistItem service for the selected item', () => {
      const checklistItemService =
        fixture.debugElement.injector.get(ChecklistItemService);
      const testId = '1';

      component.deleteChecklistItem(testId);

      expect(checklistItemService.remove).toHaveBeenCalledWith(testId);
    });
  });

  describe('editChecklistItem()', () => {
    it('should pass the checklist item id being edited and form data to the update method of the checklist item service', () => {
      const checklistItemService =
        fixture.debugElement.injector.get(ChecklistItemService);

      const testChecklistItemId = '1';
      component.editChecklistItem(testChecklistItemId);

      expect(checklistItemService.update).toHaveBeenCalledWith(
        testChecklistItemId,
        component.checklistItemForm.value
      );
    });

    it('should set the existing title for the checklist being edited in the form modal', () => {
      const checklistItemList = fixture.debugElement.query(
        By.css('app-checklist-item-list')
      );

      checklistItemList.triggerEventHandler('edit', testItems[0]);

      expect(component.checklistItemForm.value.title).toEqual(
        testItems[0].title
      );
    });
  });
});
