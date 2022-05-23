import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, ModalController } from '@ionic/angular';

import { FormModalComponent } from './form-modal.component';

describe('FormModalComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        {
          provide: ModalController,
          useValue: {
            dismiss: jest.fn(),
          },
        },
      ],
    })
      .overrideComponent(FormModalComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;

    component.formGroup = new FormGroup({
      title: new FormControl(),
    });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable save button if form is invalid', () => {
    component.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
    });

    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(
      By.css('[data-test="form-modal-save"]')
    );

    expect(saveButton.componentInstance.disabled).toBe(true);
  });

  it('should dismiss when form is submitted', () => {
    const modalCtrl = fixture.debugElement.injector.get(ModalController);

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(modalCtrl.dismiss).toHaveBeenCalled();
  });

  it('should dismiss when cancel button is clicked', () => {
    const modalCtrl = fixture.debugElement.injector.get(ModalController);

    const cancelButton = fixture.debugElement.query(
      By.css('[data-test="form-modal-cancel"]')
    );
    cancelButton.nativeElement.click();

    expect(modalCtrl.dismiss).toHaveBeenCalled();
  });

  describe('@Input() formGroup', () => {
    it('should render a text input for each control', () => {
      component.formGroup = new FormGroup({
        testOne: new FormControl(''),
        testTwo: new FormControl(''),
        testThree: new FormControl(''),
      });

      fixture.detectChanges();

      const inputs = fixture.debugElement.queryAll(
        By.css('ion-input[type="text"]')
      );

      expect(inputs.length).toBe(3);
    });

    it('should bind the inputs to the controls', async () => {
      const testValue = 'hello';

      component.formGroup = new FormGroup({
        title: new FormControl(testValue),
      });

      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('ion-input'));

      expect(input.componentInstance.value).toEqual(testValue);
    });

    it('should use form control name as label for input', () => {
      component.formGroup = new FormGroup({
        title: new FormControl(),
      });

      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('ion-label'));

      expect(label.nativeElement.innerHTML).toContain('title');
    });
  });

  describe('@Input() title', () => {
    it('should display title in modal', () => {
      const testTitle = 'hello';

      component.title = testTitle;

      fixture.detectChanges();

      const displayedTitle = fixture.debugElement.query(
        By.css('[data-test="form-modal-title"]')
      );

      expect(displayedTitle.nativeElement.innerHTML).toContain(testTitle);
    });
  });

  describe('@Output() save', () => {
    it('should emit when then form is saved', () => {
      const observerSpy = subscribeSpyTo(component.save);

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getValuesLength()).toEqual(1);
    });
  });

  describe('dismiss()', () => {
    it('should reset form values', () => {
      jest.spyOn(component.formGroup, 'reset');

      component.dismiss();

      expect(component.formGroup.reset).toHaveBeenCalled();
    });
  });
});
