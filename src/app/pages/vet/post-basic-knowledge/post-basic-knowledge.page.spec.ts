import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostBasicKnowledgePage } from './post-basic-knowledge.page';

describe('PostBasicKnowledgePage', () => {
  let component: PostBasicKnowledgePage;
  let fixture: ComponentFixture<PostBasicKnowledgePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBasicKnowledgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
