import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmersDashboardPage } from './farmers-dashboard.page';

describe('FarmersDashboardPage', () => {
  let component: FarmersDashboardPage;
  let fixture: ComponentFixture<FarmersDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
