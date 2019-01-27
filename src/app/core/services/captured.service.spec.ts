import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CapturedService } from './captured.service';

describe('CapturedService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CapturedService = TestBed.get(CapturedService);
    expect(service).toBeTruthy();
  });
});
