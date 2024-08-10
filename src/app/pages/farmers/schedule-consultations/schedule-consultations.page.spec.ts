import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleConsultationsPage } from './schedule-consultations.page';

describe('ScheduleConsultationsPage', () => {
  let component: ScheduleConsultationsPage;
  let fixture: ComponentFixture<ScheduleConsultationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleConsultationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
