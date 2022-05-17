import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule, ModalController } from '@ionic/angular';

import { AddChecklistComponent } from './add-checklist.component';

describe('AddChecklistComponent', () => {
  let component: AddChecklistComponent;
  let fixture: ComponentFixture<AddChecklistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddChecklistComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ModalController,
          useValue: {
            dismiss: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checklistForm', () => {
    it('title value should be required', () => {
      component.checklistForm.get('title').setValue('');
      expect(component.checklistForm.valid).toBe(false);
    });

    it('should disable save button if form data is not valid', () => {
      component.checklistForm.reset();
      fixture.detectChanges();

      const saveButton = fixture.debugElement.query(
        By.css('[data-test="save-checklist-button"]')
      );

      expect(saveButton.componentInstance.disabled).toBe(true);
    });
  });

  describe('save()', () => {
    it('should call dismiss() with form data', () => {
      const modalCtrl = fixture.debugElement.injector.get(ModalController);
      component.save();

      expect(modalCtrl.dismiss).toHaveBeenCalledWith(
        component.checklistForm.value
      );
    });
  });

  describe('cancel()', () => {
    it('should dismiss the modal without passing form data', () => {
      const modalCtrl = fixture.debugElement.injector.get(ModalController);
      component.cancel();

      expect(modalCtrl.dismiss).toHaveBeenCalledWith();
    });
  });
});
