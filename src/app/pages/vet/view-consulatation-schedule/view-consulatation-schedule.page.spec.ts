import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewConsulatationSchedulePage } from './view-consulatation-schedule.page';

describe('ViewConsulatationSchedulePage', () => {
  let component: ViewConsulatationSchedulePage;
  let fixture: ComponentFixture<ViewConsulatationSchedulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConsulatationSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
