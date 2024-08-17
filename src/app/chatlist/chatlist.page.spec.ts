import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatlistPage } from './chatlist.page';

describe('ChatlistPage', () => {
  let component: ChatlistPage;
  let fixture: ComponentFixture<ChatlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
