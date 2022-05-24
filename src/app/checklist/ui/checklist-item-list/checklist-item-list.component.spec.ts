import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { ChecklistItem } from 'src/app/shared/interfaces/checklist-item';

import { ChecklistItemListComponent } from './checklist-item-list.component';

@Component({
  selector: 'app-checklist-item-list',
  template: '',
})
export class MockChecklistItemListComponent {
  @Input() checklistItems!: ChecklistItem[];
  @Output() toggle = new EventEmitter<string>();
}

describe('ChecklistItemListComponent', () => {
  let component: ChecklistItemListComponent;
  let fixture: ComponentFixture<ChecklistItemListComponent>;
  const testData = [{}, {}, {}] as any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistItemListComponent],
      imports: [IonicModule.forRoot()],
    })
      .overrideComponent(ChecklistItemListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ChecklistItemListComponent);

    component = fixture.componentInstance;
    component.checklistItems = testData;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() checklist', () => {
    it('should render a list item for each element', () => {
      const listItems = fixture.debugElement.queryAll(
        By.css('[data-test="checklist-list-item"]')
      );

      expect(listItems.length).toEqual(testData.length);
    });
  });

  describe('@Output toggle', () => {
    it('should emit id for checklist item when it is clicked', () => {
      const testItem = {
        id: '1',
        checklistId: '1',
        checked: false,
        title: 'hello',
      };

      component.checklistItems = [testItem];

      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.toggle);

      const item = fixture.debugElement.query(
        By.css('[data-test="checklist-list-item"]')
      );

      item.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual(testItem.id);
    });
  });
});
