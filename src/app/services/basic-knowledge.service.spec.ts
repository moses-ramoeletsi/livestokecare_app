import { TestBed } from '@angular/core/testing';

import { BasicKnowladgeService } from './basic-knowledge.service';

describe('BasicKnowladgeService', () => {
  let service: BasicKnowladgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicKnowladgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
