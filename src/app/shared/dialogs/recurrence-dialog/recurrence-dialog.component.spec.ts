import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenceDialogComponent } from './recurrence-dialog.component';
import { TestingModule } from '../../../shared/testing/testing.module';

describe('RecurrenceDialogComponent', () => {
  let component: RecurrenceDialogComponent;
  let fixture: ComponentFixture<RecurrenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      declarations: [
        RecurrenceDialogComponent
      ]
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
