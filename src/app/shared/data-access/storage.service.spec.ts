import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
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

    jest.clearAllMocks();
  });

  it('should be created', () => {
    service = TestBed.inject(StorageService);
    expect(service).toBeTruthy();
  });

  describe('loadChecklists()', () => {
    it('should return result of get method of storage api', (done) => {
      service = TestBed.inject(StorageService);
      storage = TestBed.inject(Storage);

      service.loadChecklists().subscribe((result) => {
        expect(getMock).toHaveBeenCalledWith('checklists');
        expect(result).toEqual(testLoadData);
        done();
      });
    });

    it('should return empty array if key is undefined', (done) => {
      const undefinedGetMock = jest.fn().mockResolvedValue(undefined);

      TestBed.overrideProvider(Storage, {
        useValue: {
          create: jest.fn().mockResolvedValue({
            set: setMock,
            get: undefinedGetMock,
          }),
        },
      });

      service = TestBed.inject(StorageService);
      storage = TestBed.inject(Storage);

      service.loadChecklists().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe('loadChecklistItems()', () => {
    it('should return result of get method of storage api', (done) => {
      service = TestBed.inject(StorageService);
      storage = TestBed.inject(Storage);

      service.loadChecklistItems().subscribe((result) => {
        expect(getMock).toHaveBeenCalledWith('checklistItems');
        expect(result).toEqual(testLoadData);
        done();
      });
    });

    it('should return empty array if key is undefined', (done) => {
      const undefinedGetMock = jest.fn().mockResolvedValue(undefined);

      TestBed.overrideProvider(Storage, {
        useValue: {
          create: jest.fn().mockResolvedValue({
            set: setMock,
            get: undefinedGetMock,
          }),
        },
      });

      service = TestBed.inject(StorageService);
      storage = TestBed.inject(Storage);

      service.loadChecklistItems().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe('saveChecklists()', () => {
    beforeEach(() => {
      service = TestBed.inject(StorageService);
      storage = TestBed.inject(Storage);
    });

    it('should pass data to set method of storage api', () => {
      const testData = {};

      service.loadChecklists().subscribe(() => {
        service.saveChecklists(testData as any);
        expect(setMock).toHaveBeenCalledWith('checklists', testData);
      });
    });

    it('should NOT pass data if checklists have not been loaded yet', () => {
      const testData = {};
      service.saveChecklists(testData as any);
      expect(setMock).not.toHaveBeenCalled();
    });
  });

  describe('saveChecklistsItems()', () => {
    beforeEach(() => {
      service = TestBed.inject(StorageService);
      storage = TestBed.inject(Storage);
    });
    it('should pass data to set method of storage api', () => {
      const testData = {};

      service.loadChecklistItems().subscribe(() => {
        service.saveChecklistItems(testData as any);
        expect(setMock).toHaveBeenCalledWith('checklistItems', testData);
      });
    });

    it('should NOT pass data if checklistItems have not been loaded yet', () => {
      const testData = {};
      service.saveChecklistItems(testData as any);
      expect(setMock).not.toHaveBeenCalled();
    });
  });
});
