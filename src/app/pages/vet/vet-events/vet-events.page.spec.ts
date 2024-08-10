import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VetEventsPage } from './vet-events.page';

describe('VetEventsPage', () => {
  let component: VetEventsPage;
  let fixture: ComponentFixture<VetEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VetEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
