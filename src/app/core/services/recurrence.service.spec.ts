import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecurrenceService } from './recurrence.service';

describe('RecurrenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: RecurrenceService = TestBed.get(RecurrenceService);
    expect(service).toBeTruthy();
  });
});
