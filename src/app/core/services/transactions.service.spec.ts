import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TransactionsService = TestBed.get(TransactionsService);
    expect(service).toBeTruthy();
  });
});
