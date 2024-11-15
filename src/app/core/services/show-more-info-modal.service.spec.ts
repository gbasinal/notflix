import { TestBed } from '@angular/core/testing';

import { ShowMoreInfoModalService } from './show-more-info-modal.service';

describe('ShowMoreInfoModalService', () => {
  let service: ShowMoreInfoModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowMoreInfoModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
