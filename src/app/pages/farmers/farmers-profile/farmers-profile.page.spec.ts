import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmersProfilePage } from './farmers-profile.page';

describe('FarmersProfilePage', () => {
  let component: FarmersProfilePage;
  let fixture: ComponentFixture<FarmersProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
