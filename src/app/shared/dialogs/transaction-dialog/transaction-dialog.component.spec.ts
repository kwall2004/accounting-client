import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionDialogComponent } from './transaction-dialog.component';
import { TestingModule } from '../../../shared/testing/testing.module';

describe('TransactionDialogComponent', () => {
  let component: TransactionDialogComponent;
  let fixture: ComponentFixture<TransactionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        TransactionDialogComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
