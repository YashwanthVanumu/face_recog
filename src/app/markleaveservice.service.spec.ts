import { TestBed } from '@angular/core/testing';

import { MarkleaveserviceService } from './markleaveservice.service';

describe('MarkleaveserviceService', () => {
  let service: MarkleaveserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkleaveserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
