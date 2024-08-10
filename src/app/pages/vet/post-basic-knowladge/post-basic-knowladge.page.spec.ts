import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostBasicKnowladgePage } from './post-basic-knowladge.page';

describe('PostBasicKnowladgePage', () => {
  let component: PostBasicKnowladgePage;
  let fixture: ComponentFixture<PostBasicKnowladgePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBasicKnowladgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
