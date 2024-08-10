import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VetDashboardPage } from './vet-dashboard.page';

describe('VetDashboardPage', () => {
  let component: VetDashboardPage;
  let fixture: ComponentFixture<VetDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VetDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
