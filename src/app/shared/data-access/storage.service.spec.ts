import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  const testLoadData = {};

  const setMock = jest.fn();
  const getMock = jest.fn().mockResolvedValue(testLoadData);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: {
            create: jest.fn().mockResolvedValue({
              set: setMock,
              get: getMock,
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

  describe('loadChecklists()', () => {
    it('should return result of get method of storage api', async () => {
      const result = await service.loadChecklists();
      expect(getMock).toHaveBeenCalledWith('checklists');
      expect(result).toEqual(testLoadData);
    });
  });

  describe('loadChecklistItems()', () => {
    it('should return result of get method of storage api', async () => {
      const result = await service.loadChecklistItems();
      expect(getMock).toHaveBeenCalledWith('checklistItems');
      expect(result).toEqual(testLoadData);
    });
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
