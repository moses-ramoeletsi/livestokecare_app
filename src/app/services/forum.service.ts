import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  constructor(private firestore: AngularFirestore) {}

  getPosts(): Observable<any[]> {
    return this.firestore
      .collection('posts', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' })
      .pipe(
        map((posts: any[]) =>
          posts.map((post: any) => {
            if (
              post.createdAt &&
              post.createdAt instanceof firebase.firestore.Timestamp
            ) {
              post.createdAt = post.createdAt.toDate();
            }
            return post;
          })
        )
      );
  }

  addPost(post: any) {
    const docRef = this.firestore.collection('posts').doc();
    const postId = docRef.ref.id;
    post.id = postId;
    return docRef.set(post);
  }

  updatePost(post: any) {
    return this.firestore.collection('posts').doc(post.id).update(post);
  }

  deletePost(postId: string) {
    return this.firestore.collection('posts').doc(postId).delete();
  }

  addComment(postId: string, comment: any) {
    return this.firestore
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        ...comment,
        createdAt: new Date(),
      });
  }

  getComments(postId: string): Observable<any[]> {
    return this.firestore
      .collection('posts')
      .doc(postId)
      .collection('comments', (ref) => ref.orderBy('createdAt'))
      .valueChanges();
  }
}