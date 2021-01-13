import { TestBed } from '@angular/core/testing';

import { MonprofilService } from './monprofil.service';

describe('MonprofilService', () => {
  let service: MonprofilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonprofilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
