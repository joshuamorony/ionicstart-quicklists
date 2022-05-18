import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { ChecklistListComponent } from './checklist-list.component';

describe('ChecklistListComponent', () => {
  let component: ChecklistListComponent;
  let fixture: ComponentFixture<ChecklistListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistListComponent],
      imports: [IonicModule.forRoot()],
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
});
