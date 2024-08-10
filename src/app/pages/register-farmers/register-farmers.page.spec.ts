import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFarmersPage } from './register-farmers.page';

describe('RegisterFarmersPage', () => {
  let component: RegisterFarmersPage;
  let fixture: ComponentFixture<RegisterFarmersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFarmersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
