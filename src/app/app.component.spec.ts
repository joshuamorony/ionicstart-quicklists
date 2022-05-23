import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ChecklistItemService } from './checklist/data-access/checklist-item.service';
import { ChecklistService } from './shared/data-access/checklist.service';

jest.mock('./checklist/data-access/checklist-item.service');
jest.mock('./shared/data-access/checklist.service');

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ChecklistItemService, ChecklistService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call load method for checklist service', () => {
    const checklistService =
      fixture.debugElement.injector.get(ChecklistService);

    component.ngOnInit();
    expect(checklistService.load).toHaveBeenCalled();
  });

  it('should call load method for checklist item service', () => {
    const checklistItemService =
      fixture.debugElement.injector.get(ChecklistItemService);

    component.ngOnInit();
    expect(checklistItemService.load).toHaveBeenCalled();
  });
});
