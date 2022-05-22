import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ChecklistItem } from 'src/app/shared/interfaces/checklist-item';

import { ChecklistItemListComponent } from './checklist-item-list.component';

@Component({
  selector: 'app-checklist-item-list',
  template: '',
})
export class MockChecklistItemListComponent {
  @Input() checklistItems: ChecklistItem[];
}

describe('ChecklistItemListComponent', () => {
  let component: ChecklistItemListComponent;
  let fixture: ComponentFixture<ChecklistItemListComponent>;

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
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() checklist', () => {
    it('should render a list item for each element', () => {
      const testData = [{}, {}, {}] as any;
      component.checklistItems = testData;

      fixture.detectChanges();

      const listItems = fixture.debugElement.queryAll(
        By.css('[data-test="checklist-list-item"]')
      );

      expect(listItems.length).toEqual(testData.length);
    });
  });
});
