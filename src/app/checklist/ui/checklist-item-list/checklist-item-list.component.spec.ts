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
import { IonicModule, IonList } from '@ionic/angular';
import { ChecklistItem } from 'src/app/shared/interfaces/checklist-item';

import { ChecklistItemListComponent } from './checklist-item-list.component';

@Component({
  selector: 'app-checklist-item-list',
  template: '',
})
export class MockChecklistItemListComponent {
  @Input() checklistItems!: ChecklistItem[];
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
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
    jest.spyOn(component.itemList, 'closeSlidingItems').mockResolvedValue(true);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close open sliding items when edit is triggered', () => {
    const editButton = fixture.debugElement.query(
      By.css('[data-test="edit-checklist-item"]')
    );
    editButton.nativeElement.click();
    expect(component.itemList.closeSlidingItems).toHaveBeenCalled();
  });

  it('should close open sliding items when delete is triggered', () => {
    const deleteButton = fixture.debugElement.query(
      By.css('[data-test="delete-checklist-item"]')
    );
    deleteButton.nativeElement.click();
    expect(component.itemList.closeSlidingItems).toHaveBeenCalled();
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

  describe('@Output delete', () => {
    it('should emit item id to be deleted', () => {
      const testItem = {
        id: '1',
        checklistId: '1',
        checked: false,
        title: 'hello',
      };

      component.checklistItems = [testItem];

      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.delete);

      const deleteButton = fixture.debugElement.query(
        By.css('[data-test="delete-checklist-item"]')
      );
      deleteButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual(testItem.id);
    });
  });

  describe('@Output edit', () => {
    it('should emit item to be edited', () => {
      const testItem = {
        id: '1',
        checklistId: '1',
        checked: false,
        title: 'hello',
      };

      component.checklistItems = [testItem];

      fixture.detectChanges();

      const observerSpy = subscribeSpyTo(component.edit);

      const editButton = fixture.debugElement.query(
        By.css('[data-test="edit-checklist-item"]')
      );
      editButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual(testItem);
    });
  });
});
