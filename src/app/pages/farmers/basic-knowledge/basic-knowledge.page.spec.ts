import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicKnowledgePage } from './basic-knowledge.page';

describe('BasicKnowledgePage', () => {
  let component: BasicKnowledgePage;
  let fixture: ComponentFixture<BasicKnowledgePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicKnowledgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
