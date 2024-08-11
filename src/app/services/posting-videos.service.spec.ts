import { TestBed } from '@angular/core/testing';

import { PostingVideosService } from './posting-videos.service';

describe('PostingVideosService', () => {
  let service: PostingVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostingVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
