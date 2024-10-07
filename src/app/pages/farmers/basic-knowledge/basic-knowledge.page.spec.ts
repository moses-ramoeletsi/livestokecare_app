import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicKnowladgePage } from './basic-knowledge.page';

describe('BasicKnowladgePage', () => {
  let component: BasicKnowladgePage;
  let fixture: ComponentFixture<BasicKnowladgePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicKnowladgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
