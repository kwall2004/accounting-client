import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureConfirmationComponent } from './capture-confirmation.component';

describe('CaptureConfirmationComponent', () => {
  let component: CaptureConfirmationComponent;
  let fixture: ComponentFixture<CaptureConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
