import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostingVideosService {
  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }
  
  async getCurrentUserById(userId: string): Promise<any> {
    try {
      const doc = await this.fireStore.collection('users').doc(userId).get().toPromise();
      if (doc && doc.exists) {
        return doc.data();
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      throw error;
    }
  }
  
  postVideo(video: any) {
    const docRef = this.fireStore.collection('videos').doc();
    const id = docRef.ref.id;
    video.id = id;
    return docRef.set(video);
  }

  updateVideoPost(video: any) {
    return this.fireStore.collection('videos').doc(video.id).update(video);
  }

  async deleteVideoPost(video: any) {
    await this.fireStore.collection('videos').doc(video.id).delete();
    if (video.videoUrl) {
      await this.storage.refFromURL(video.videoUrl).delete().toPromise();
    }
  }

  fetchPostedVideo(): Observable<any[]> {
    return this.fireStore.collection('videos').valueChanges();
  }
}
