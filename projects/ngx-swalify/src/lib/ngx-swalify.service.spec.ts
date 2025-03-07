import { TestBed } from '@angular/core/testing';

import { NgxSwalifyService } from './ngx-swalify.service';

describe('NgxSwalifyService', () => {
  let service: NgxSwalifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSwalifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
