import { TestBed } from '@angular/core/testing';

import { SongLevelService } from './song-level.service';

describe('SongLevelService', () => {
  let service: SongLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
