import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostVideosPage } from './post-videos.page';

describe('PostVideosPage', () => {
  let component: PostVideosPage;
  let fixture: ComponentFixture<PostVideosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
