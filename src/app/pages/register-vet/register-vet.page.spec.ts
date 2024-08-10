import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterVetPage } from './register-vet.page';

describe('RegisterVetPage', () => {
  let component: RegisterVetPage;
  let fixture: ComponentFixture<RegisterVetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
