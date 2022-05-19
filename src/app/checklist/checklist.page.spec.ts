import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';

import { ChecklistPage } from './checklist.page';

describe('ChecklistPage', () => {
  let component: ChecklistPage;
  let fixture: ComponentFixture<ChecklistPage>;

  const testChecklist = {
    id: 'hello',
    title: 'hello',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: testChecklist.id,
              })
            ),
          },
        },
        {
          provide: ChecklistService,
          useValue: {
            getChecklistById: jest.fn().mockReturnValue(of(testChecklist)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checklist$', () => {
    it('should be the stream returned from getChecklistById for the id passed in through the route', () => {
      const checklistService =
        fixture.debugElement.injector.get(ChecklistService);

      jest
        .spyOn(checklistService, 'getChecklistById')
        .mockReturnValue(of(testChecklist));

      const observerSpy = subscribeSpyTo(component.checklist$);

      expect(checklistService.getChecklistById).toHaveBeenLastCalledWith(
        testChecklist.id
      );
      expect(observerSpy.getLastValue()).toEqual(testChecklist);
    });
  });
});
