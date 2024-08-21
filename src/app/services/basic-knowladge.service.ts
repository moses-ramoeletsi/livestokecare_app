import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicKnowladgeService {

  constructor(private fireStore: AngularFirestore) { }
  
  async getCurrentUserById(userId: string) :Promise<any>{
    try{
      const doc = await this.fireStore.collection('users').doc(userId).get().toPromise();
      if(doc && doc.exists){
        return doc.data();
      }else{
        throw new Error('User data not found');
      }
    }catch (error) {
      throw error;
    }
  }
  
  postArticle(article: any){
    const docRef = this.fireStore.collection('articles').doc();
    const id = docRef.ref.id;
    article.id = id;
    return docRef.set(article)

  }

  fetchPostedArticle() : Observable<any[]>{
    return this.fireStore.collection('articles').valueChanges();
  }
  updatePost(article: any) {
    return this.fireStore.collection('articles').doc(article.id).update(article);
  }

  deletearticle(article: any) {
    return this.fireStore.collection('articles').doc(article.id).delete();
  }
}
