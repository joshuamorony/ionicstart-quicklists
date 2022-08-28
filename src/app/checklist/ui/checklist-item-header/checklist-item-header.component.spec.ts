import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { Checklist } from 'src/app/shared/interfaces/checklist';
import { ChecklistItemHeaderComponent } from './checklist-item-header.component';

@Component({
  selector: 'app-checklist-item-header',
  template: ``,
})
export class MockChecklistItemHeaderComponent {
  @Input() checklist!: Checklist;
  @Output() resetChecklist = new EventEmitter<string>();
  @Output() addItem = new EventEmitter<void>();
}

describe('ChecklistItemHeaderComponent', () => {
  let component: ChecklistItemHeaderComponent;
  let fixture: ComponentFixture<ChecklistItemHeaderComponent>;

  const testChecklist = {
    id: '1',
    title: 'test',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistItemHeaderComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ChecklistItemHeaderComponent);
    component = fixture.componentInstance;

    component.checklist = testChecklist;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Output resetChecklist', () => {
    it('should emit checklist id when reset-items clicked', () => {
      const observerSpy = subscribeSpyTo(component.resetChecklist);

      const resetItemsButton = fixture.debugElement.query(
        By.css('[data-test="reset-items"]')
      );

      resetItemsButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual(testChecklist.id);
    });
  });

  describe('@Output addItem', () => {
    it('should emit when add-checklist-item-button clicked', () => {
      const observerSpy = subscribeSpyTo(component.addItem);

      const addItemButton = fixture.debugElement.query(
        By.css('[data-test="add-checklist-item-button"]')
      );

      addItemButton.nativeElement.click();

      expect(observerSpy.getValuesLength()).toEqual(1);
    });
  });
});
