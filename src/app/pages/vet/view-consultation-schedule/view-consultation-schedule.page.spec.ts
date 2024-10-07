import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewConsultationSchedulePage } from './view-consultation-schedule.page';

describe('ViewConsultationSchedulePage', () => {
  let component: ViewConsultationSchedulePage;
  let fixture: ComponentFixture<ViewConsultationSchedulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConsultationSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
