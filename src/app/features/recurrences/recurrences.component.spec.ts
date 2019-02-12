import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrencesComponent } from './recurrences.component';

describe('RecurrencesComponent', () => {
  let component: RecurrencesComponent;
  let fixture: ComponentFixture<RecurrencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
