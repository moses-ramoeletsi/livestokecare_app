import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  chatPartnerName?: string;
  messages: any[] = [];
  newMessage = '';
  currentUserId?: string;
  chatPartnerId?: string;
  currentUserType?: string;
  chatId?: string;
  selectedFile?: File;
  selectedFilePreview?: string;

  constructor(
    private afs: AngularFirestore,
    private authService: UserDetailsService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router 
  ) {}

 
  ngOnInit() {
  this.authService.getAuth().user.subscribe(user => {
    if (user) {
      this.currentUserId = user.uid;
      this.chatPartnerId = this.route.snapshot.paramMap.get('userId')!;
      this.chatId = this.createChatId(this.currentUserId, this.chatPartnerId);
      this.currentUserId = user.uid;
      
      this.afs.collection('users').doc(user.uid).get().subscribe(doc => {
        const data = doc.data() as { userType: string };
        this.currentUserType = data.userType;
      });

      this.afs.collection('users').doc(this.chatPartnerId).valueChanges()
        .subscribe((user: any) => {
          this.chatPartnerName = user.name;
        });
      
      this.afs.collection('chats').doc(this.chatId).collection('messages', ref => ref.orderBy('timestamp'))
        .valueChanges()
        .subscribe(messages => {
          this.messages = messages.map(message => {
            return {
              ...message,
              timestamp: (message['timestamp'] as firebase.firestore.Timestamp).toDate() 
            };
          });
          this.changeDetectorRef.detectChanges(); 
        });
    }
  });
}

  createChatId(uid1: string, uid2: string): string {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  }

  sendMessage() {
    if (this.newMessage.trim().length > 0 || this.selectedFile) {
      if(this.selectedFile){
        this.uploadImageAndSendMessage();
      }else {
        this.afs.collection('chats').doc(this.chatId).collection('messages').add({
          text: this.newMessage,
          userId: this.currentUserId,
          timestamp: new Date()
        });
        this.newMessage = '';
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => this.selectedFilePreview = e.target!.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }


  clearSelectedFile() {
    this.selectedFile = undefined;
    this.selectedFilePreview = undefined;
  }

  uploadImageAndSendMessage() {
    const filePath = `chat_images/${this.currentUserId}/${new Date().getTime()}_${this.selectedFile!.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          const newMessage = {
            imageUrl: url,
            userId: this.currentUserId,
            timestamp: new Date()
          };

          this.afs.collection('chats').doc(this.chatId).collection('messages').add(newMessage)
            .then((docRef) => {
              this.messages.push({
                ...newMessage,
                id: docRef.id
              });

              this.changeDetectorRef.detectChanges();
            });

          this.clearSelectedFile();
          this.newMessage = '';
        });
      })
    ).subscribe();
  }

  onBackButtonClick() {
    if (this.currentUserType === 'veterinarian') {
      this.router.navigate(['/vet-dashboard']);
    } else if (this.currentUserType === 'farmer') {
      this.router.navigate(['/farmers-dashboard']);
    }
  }
}