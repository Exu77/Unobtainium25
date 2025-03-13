import { TestBed } from '@angular/core/testing';

import { SongLinkService } from './song-link.service';

describe('SongLinkService', () => {
  let service: SongLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
