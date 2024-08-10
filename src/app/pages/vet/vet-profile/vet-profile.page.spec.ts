import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VetProfilePage } from './vet-profile.page';

describe('VetProfilePage', () => {
  let component: VetProfilePage;
  let fixture: ComponentFixture<VetProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VetProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
