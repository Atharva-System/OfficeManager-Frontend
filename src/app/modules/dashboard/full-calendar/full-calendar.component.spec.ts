import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCalendarComponent1 } from './full-calendar.component';

describe('FullCalendarComponent', () => {
  let component: FullCalendarComponent1;
  let fixture: ComponentFixture<FullCalendarComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullCalendarComponent1 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCalendarComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
