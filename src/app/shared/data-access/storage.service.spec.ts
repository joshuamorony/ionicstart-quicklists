import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  const setMock = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: {
            create: jest.fn().mockResolvedValue({
              set: setMock,
            }),
          },
        },
      ],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveChecklists()', () => {
    it('should pass data to set method of storage api', async () => {
      const testData = {};
      await service.saveChecklists(testData as any);
      expect(setMock).toHaveBeenCalledWith('checklists', testData);
    });
  });

  describe('saveChecklistsItems()', () => {
    it('should pass data to set method of storage api', async () => {
      const testData = {};
      await service.saveChecklistItems(testData as any);
      expect(setMock).toHaveBeenCalledWith('checklistItems', testData);
    });
  });
});
