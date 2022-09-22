import { TestBed } from '@angular/core/testing';

import { CustomSweetalertService } from './custom-sweetalert.service';

describe('CustomSweetalertService', () => {
  let service: CustomSweetalertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSweetalertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
