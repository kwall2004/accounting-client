import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenceDialogComponent } from './recurrence-dialog.component';

describe('RecurrenceComponent', () => {
  let component: RecurrenceDialogComponent;
  let fixture: ComponentFixture<RecurrenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
