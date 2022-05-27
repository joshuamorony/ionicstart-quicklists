import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';

import { HomePage } from './home.page';
import { MockChecklistComponent } from './ui/checklist-list/checklist-list.component.spec';

jest.mock('../shared/data-access/checklist.service');

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const presentMock = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, MockChecklistComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        ChecklistService,
        {
          provide: AlertController,
          useValue: {
            create: jest.fn().mockResolvedValue({
              present: presentMock,
            }),
          },
        },
        {
          provide: ModalController,
          useValue: {
            create: jest.fn().mockResolvedValue({
              present: presentMock,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jest.clearAllMocks();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checklistForm', () => {
    it('should require a title field', () => {
      const titleControl = component.checklistForm.get('title') as any;

      titleControl.setValue('');

      expect(titleControl.valid).toBe(false);
    });
  });

  describe('checklistIdBeingEdited$', () => {
    it('should be null initially', () => {
      const observerSpy = subscribeSpyTo(component.checklistIdBeingEdited$);
      expect(observerSpy.getLastValue()).toBe(null);
    });

    it('should emit checklist id when edit is triggered', () => {
      const observerSpy = subscribeSpyTo(component.checklistIdBeingEdited$);

      const checklistItemList = fixture.debugElement.query(
        By.css('app-checklist-list')
      );

      const testChecklist = { id: '1' };

      checklistItemList.triggerEventHandler('edit', testChecklist);

      expect(observerSpy.getLastValue()).toEqual(testChecklist.id);
    });

    it('should emit null when the modal is dismissed', () => {
      const modal = fixture.debugElement.query(By.css('ion-modal'));
      const observerSpy = subscribeSpyTo(component.checklistIdBeingEdited$);

      component.checklistIdBeingEdited$.next('1');

      modal.triggerEventHandler('ionModalDidDismiss', null);

      expect(observerSpy.getLastValue()).toBe(null);
    });
  });

  describe('formModalIsOpen$', () => {
    it('should emit true when add button is clicked', () => {
      const observerSpy = subscribeSpyTo(component.formModalIsOpen$);

      const addButton = fixture.debugElement.query(
        By.css('[data-test="add-checklist-button"]')
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

  describe('addChecklist()', () => {
    it('should call the add() method of the ChecklistService with the form data', () => {
      const checklistService =
        fixture.debugElement.injector.get(ChecklistService);

      component.addChecklist();

      expect(checklistService.add).toHaveBeenCalledWith(
        component.checklistForm.value
      );
    });
  });

  describe('deleteChecklist()', () => {
    it('should launch an alert dialog', async () => {
      await component.deleteChecklist('1');
      expect(presentMock).toHaveBeenCalled();
    });

    it('confirming alert dialog should cause checklist id to be sent to remove method of checklist service', async () => {
      const checklistService =
        fixture.debugElement.injector.get(ChecklistService);

      const alertCtrl = fixture.debugElement.injector.get(AlertController);
      const create = alertCtrl.create as jest.Mock;

      const testId = '1';
      await component.deleteChecklist(testId);

      const handler = create.mock.calls[0][0].buttons[0].handler;
      handler();

      expect(checklistService.remove).toHaveBeenCalledWith(testId);
    });
  });

  describe('editChecklist()', () => {
    const testChecklist = { id: '1', title: 'hello' };

    it('should pass the checklist id being edited and form data to the update method of the checklist service', () => {
      const checklistService =
        fixture.debugElement.injector.get(ChecklistService);

      const testChecklistId = '1';
      component.editChecklist(testChecklistId);

      expect(checklistService.update).toHaveBeenCalledWith(
        testChecklistId,
        component.checklistForm.value
      );
    });

    it('should set the existing title for the checklist being edited in the form modal', () => {
      const checklistList = fixture.debugElement.query(
        By.css('app-checklist-list')
      );

      checklistList.triggerEventHandler('edit', testChecklist);

      expect(component.checklistForm.value.title).toEqual(testChecklist.title);
    });

    it('should open the form modal when item is being edited', () => {
      const checklistList = fixture.debugElement.query(
        By.css('app-checklist-list')
      );

      checklistList.triggerEventHandler('edit', testChecklist);

      fixture.detectChanges();

      const modal = fixture.debugElement.query(By.css('ion-modal'));

      expect(modal.componentInstance.isOpen).toBe(true);
    });
  });
});
