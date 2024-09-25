import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUserFeedbackPage } from './view-user-feedback.page';

describe('ViewUserFeedbackPage', () => {
  let component: ViewUserFeedbackPage;
  let fixture: ComponentFixture<ViewUserFeedbackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
