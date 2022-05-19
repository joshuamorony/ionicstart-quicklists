import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChecklistService } from '../shared/data-access/checklist.service';

import { HomePage } from './home.page';
import { MockChecklistComponent } from './ui/checklist-list/checklist-list.component.spec';

jest.mock('../shared/data-access/checklist.service');

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, MockChecklistComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [ChecklistService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checklistForm', () => {
    it('should require a title field', () => {
      const titleControl = component.checklistForm.get('title');

      titleControl.setValue('');

      expect(titleControl.valid).toBe(false);
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
});
