import { TestBed } from '@angular/core/testing';

import { ComentariesService } from './comentaries.service';

describe('ComentariesService', () => {
  let service: ComentariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
