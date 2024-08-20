import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllOrdersPage } from './view-all-orders.page';

describe('ViewAllOrdersPage', () => {
  let component: ViewAllOrdersPage;
  let fixture: ComponentFixture<ViewAllOrdersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
