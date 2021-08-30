import { TestBed } from '@angular/core/testing';

import { RandomnessService } from './randomness.service';

describe('RandomnessService', () => {
  let service: RandomnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
