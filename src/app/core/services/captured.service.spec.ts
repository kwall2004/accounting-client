import { TestBed } from '@angular/core/testing';

import { CapturedService } from './captured.service';

describe('CapturedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapturedService = TestBed.get(CapturedService);
    expect(service).toBeTruthy();
  });
});
