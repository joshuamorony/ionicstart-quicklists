import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ChecklistItemService } from './checklist/data-access/checklist-item.service';
import { ChecklistService } from './shared/data-access/checklist.service';
import { StorageService } from './shared/data-access/storage.service';

jest.mock('./checklist/data-access/checklist-item.service');
jest.mock('./shared/data-access/checklist.service');
jest.mock('./shared/data-access/storage.service');

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ChecklistItemService, ChecklistService, StorageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call load method for checklist service', async () => {
    const checklistService =
      fixture.debugElement.injector.get(ChecklistService);

    expect(checklistService.load).toHaveBeenCalled();
  });

  it('should call load method for checklist item service', async () => {
    const checklistItemService =
      fixture.debugElement.injector.get(ChecklistItemService);

    expect(checklistItemService.load).toHaveBeenCalled();
  });
});
