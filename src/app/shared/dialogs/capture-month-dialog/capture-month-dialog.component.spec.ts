import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureMonthDialogComponent } from './capture-month-dialog.component';
import { TestingModule } from '../../../shared/testing/testing.module';

describe('CaptureMonthDialogComponent', () => {
  let component: CaptureMonthDialogComponent;
  let fixture: ComponentFixture<CaptureMonthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      declarations: [
        CaptureMonthDialogComponent
      ]
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
