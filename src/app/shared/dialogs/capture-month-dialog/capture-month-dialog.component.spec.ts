import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureMonthDialogComponent } from './capture-month-dialog.component';

describe('CaptureConfirmationComponent', () => {
  let component: CaptureMonthDialogComponent;
  let fixture: ComponentFixture<CaptureMonthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureMonthDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureMonthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
