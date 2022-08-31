import { TestBed } from '@angular/core/testing';

import { AuthCommonService } from './auth-common.service';

describe('AuthCommonService', () => {
  let service: AuthCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
