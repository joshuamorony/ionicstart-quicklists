import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let storage: Storage;

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
    storage = TestBed.inject(Storage);

    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init()', () => {
    it('should return a promise', () => {
      expect(service.init()).toBeInstanceOf(Promise);
    });
  });

  describe('loadChecklists()', () => {
    it('should return result of get method of storage api', async () => {
      await service.init();
      const result = await service.loadChecklists();
      expect(getMock).toHaveBeenCalledWith('checklists');
      expect(result).toEqual(testLoadData);
    });

    it('should return empty array if key is undefined', async () => {
      jest.spyOn(storage, 'create').mockResolvedValue({
        get: jest.fn().mockResolvedValue(undefined),
      } as any);

      await service.init();
      const result = await service.loadChecklists();
      expect(result).toEqual([]);
    });
  });

  describe('loadChecklistItems()', () => {
    it('should return result of get method of storage api', async () => {
      await service.init();
      const result = await service.loadChecklistItems();
      expect(getMock).toHaveBeenCalledWith('checklistItems');
      expect(result).toEqual(testLoadData);
    });

    it('should return empty array if key is undefined', async () => {
      jest.spyOn(storage, 'create').mockResolvedValue({
        get: jest.fn().mockResolvedValue(undefined),
      } as any);

      await service.init();
      const result = await service.loadChecklistItems();
      expect(result).toEqual([]);
    });
  });

  describe('saveChecklists()', () => {
    it('should pass data to set method of storage api', async () => {
      await service.init();
      const test = await service.loadChecklists();
      const testData = {};
      await service.saveChecklists(testData as any);
      expect(setMock).toHaveBeenCalledWith('checklists', testData);
    });

    it('should NOT pass data if checklists have not been loaded yet', async () => {
      await service.init();
      const testData = {};
      await service.saveChecklists(testData as any);
      expect(setMock).not.toHaveBeenCalled();
    });
  });

  describe('saveChecklistsItems()', () => {
    it('should pass data to set method of storage api', async () => {
      await service.init();
      await service.loadChecklistItems();
      const testData = {};
      await service.saveChecklistItems(testData as any);
      expect(setMock).toHaveBeenCalledWith('checklistItems', testData);
    });

    it('should NOT pass data if checklistItems have not been loaded yet', async () => {
      await service.init();
      const testData = {};
      await service.saveChecklistItems(testData as any);
      expect(setMock).not.toHaveBeenCalled();
    });
  });
});
