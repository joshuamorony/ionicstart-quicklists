import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Checklist } from '../../../shared/interfaces/checklist';

import { ChecklistListComponent } from './checklist-list.component';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

@Component({
  selector: 'app-checklist-list',
  template: '',
})
export class MockChecklistComponent {
  @Input() checklists!: Checklist[];
  @Output() delete = new EventEmitter<string>();
}

describe('ChecklistListComponent', () => {
  let component: ChecklistListComponent;
  let fixture: ComponentFixture<ChecklistListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistListComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    })
      .overrideComponent(ChecklistListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() checklists', () => {
    it('should render a list item for each element', () => {
      const testData = [{}, {}, {}] as any;
      component.checklists = testData;

      fixture.detectChanges();

      const listItems = fixture.debugElement.queryAll(
        By.css('[data-test="checklist-item"]')
      );

      expect(listItems.length).toEqual(testData.length);
    });
  });

  describe('@Output delete', () => {
    it('should emit item id to be deleted', () => {
      const testData = [{ id: '1', title: 'test' }] as any;
      component.checklists = testData;

      const observerSpy = subscribeSpyTo(component.delete);

      fixture.detectChanges();

      const deleteButton = fixture.debugElement.query(
        By.css('[data-test="delete-checklist"]')
      );
      deleteButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual(testData[0].id);
    });
  });
});
