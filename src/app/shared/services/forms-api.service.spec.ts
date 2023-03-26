import { TestBed } from '@angular/core/testing';

import { FormsAPIService } from './forms-api.service';

describe('FormsAPIService', () => {
  let service: FormsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
