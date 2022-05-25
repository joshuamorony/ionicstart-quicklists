import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AlertController, IonicModule } from '@ionic/angular';
import { ChecklistService } from '../shared/data-access/checklist.service';

import { HomePage } from './home.page';
import { MockChecklistComponent } from './ui/checklist-list/checklist-list.component.spec';

jest.mock('../shared/data-access/checklist.service');

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const presentMock = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, MockChecklistComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        ChecklistService,
        {
          provide: AlertController,
          useValue: {
            create: jest.fn().mockResolvedValue({
              present: presentMock,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jest.clearAllMocks();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checklistForm', () => {
    it('should require a title field', () => {
      const titleControl = component.checklistForm.get('title') as any;

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

  describe('deleteChecklist()', () => {
    it('should launch an alert dialog', async () => {
      await component.deleteChecklist('1');
      expect(presentMock).toHaveBeenCalled();
    });

    it('confirming alert dialog should cause checklist id to be sent to remove method of checklist service', async () => {
      const checklistService =
        fixture.debugElement.injector.get(ChecklistService);

      const alertCtrl = fixture.debugElement.injector.get(AlertController);
      const create = alertCtrl.create as jest.Mock;

      const testId = '1';
      await component.deleteChecklist(testId);

      const handler = create.mock.calls[0][0].buttons[0].handler;
      handler();

      expect(checklistService.remove).toHaveBeenCalledWith(testId);
    });
  });
});
