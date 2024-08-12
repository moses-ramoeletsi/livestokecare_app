import { TestBed } from '@angular/core/testing';

import { AnimalProfileService } from './animal-profile.service';

describe('AnimalProfileService', () => {
  let service: AnimalProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
