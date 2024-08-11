import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicKnowladgeService {

  constructor(private afAuth:  AngularFireAuth, private fireStore: AngularFirestore) { }
  
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
  
  postArticle(event: any){
    return this.fireStore.collection('articles').add(event);
  }

  fetchPostedArticle() : Observable<any[]>{
    return this.fireStore.collection('articles').valueChanges();
  }
}
