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
  @Output() edit = new EventEmitter<Checklist>();
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
    component.checklists = [];
    fixture.detectChanges();
    jest
      .spyOn(component.checklistList, 'closeSlidingItems')
      .mockResolvedValue(true);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close open sliding items when edit is triggered', () => {
    const testData = [{}, {}, {}] as any;
    component.checklists = testData;

    fixture.detectChanges();

    const editButton = fixture.debugElement.query(
      By.css('[data-test="edit-checklist"]')
    );
    editButton.nativeElement.click();
    expect(component.checklistList.closeSlidingItems).toHaveBeenCalled();
  });

  it('should close open sliding items when delete is triggered', () => {
    const testData = [{}, {}, {}] as any;
    component.checklists = testData;

    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(
      By.css('[data-test="delete-checklist"]')
    );
    deleteButton.nativeElement.click();
    expect(component.checklistList.closeSlidingItems).toHaveBeenCalled();
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

    it('should render a message only when checklists input is empty', () => {
      const testData = [{}, {}, {}] as any;
      component.checklists = testData;

      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('[data-test="no-checklists-message"]')
        )
      ).toBeFalsy();

      const testEmptyData = [] as any;
      component.checklists = testEmptyData;

      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('[data-test="no-checklists-message"]')
        )
      ).toBeTruthy();
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

  describe('@Output edit', () => {
    it('should emit checklist to be edited', () => {
      const testData = [{ id: '1', title: 'test' }] as any;
      component.checklists = testData;

      const observerSpy = subscribeSpyTo(component.edit);

      fixture.detectChanges();

      const editButton = fixture.debugElement.query(
        By.css('[data-test="edit-checklist"]')
      );
      editButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual(testData[0]);
    });
  });
});
