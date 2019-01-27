import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { InterceptorService } from './interceptor.service';
import { reducers } from '../../core/store/reducers';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot(reducers)
    ]
  }));

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });
});
