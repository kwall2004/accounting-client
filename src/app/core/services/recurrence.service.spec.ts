import { TestBed } from '@angular/core/testing';

import { RecurrenceService } from './recurrence.service';

describe('RecurrenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecurrenceService = TestBed.get(RecurrenceService);
    expect(service).toBeTruthy();
  });
});
