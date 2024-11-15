import { TestBed } from '@angular/core/testing';

import { DebouncerService } from './debouncer.service';

describe('DebouncerService', () => {
  let service: DebouncerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebouncerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
