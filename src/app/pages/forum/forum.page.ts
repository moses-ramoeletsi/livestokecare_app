import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { ForumService } from 'src/app/services/forum.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  @ViewChild('postModal') postModal!: IonModal;
  @ViewChild('modal') createPostModal!: IonModal;
  posts: any;
  newPost = {
    id: '',
    description: '',
    uid: '',
    userName: '',
    createdAt: null as Date | null,
  };
  newComment = {
    text: '',
    uid: '',
    userName: '',
    createdAt: null as Date | null,
  };
  currentUser: any;
  selectedPost: any;
  postComments: any[] = [];
  currentUserType?: string;
  isEditing = false;

  constructor(
    private forumService: ForumService,
    private userService: UserDetailsService,
    private afs: AngularFirestore,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAuth().user.subscribe((user) => {
      if (user) {
        this.afs
          .collection('users')
          .doc(user.uid)
          .get()
          .subscribe((doc) => {
            const data = doc.data() as { userType: string };
            this.currentUserType = data.userType;
          });
      }
      this.getPosts();
      this.getCurrentUser();
    });
  }

  getPosts() {
    this.posts = this.forumService.getPosts();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.newPost.uid = user.uid;
        this.newPost.userName = user.name;
        this.newComment.uid = user.uid;
        this.newComment.userName = user.name;
      }
    });
  }

  openPost(post: any) {
    this.selectedPost = post;
    this.forumService.getComments(post.id).subscribe((comments) => {
      this.postComments = comments;
    });
    this.postModal.present();
  }

  submitPost() {
    if (this.newPost.description) {
      if (this.isEditing) {
        this.forumService.updatePost(this.newPost).then(() => {
          this.showAlert('Success', 'Post updated successfully!');
          this.resetPostForm();
        });
      } else {
        this.newPost.createdAt = new Date();
        this.forumService.addPost(this.newPost).then(() => {
          this.showAlert('Success', 'Post posted successfully!');
          this.resetPostForm();
        });
      }
    }
  }

  resetPostForm() {
    this.newPost = {
      id: '',
      description: '',
      uid: this.currentUser.uid,
      userName: this.currentUser.name,
      createdAt: null,
    };
    this.isEditing = false;
    this.createPostModal.dismiss();
  }

  editPost(post: any) {
    this.isEditing = true;
    this.newPost = { ...post };
    this.createPostModal.present();
  }

 async deletePost(post: any) {
    const alert= await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete the post for ${post.description}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.forumService.deletePost(post.id);
              this.showAlert('Success', 'Post deleted successfully!');
            } catch (error) {
              this.showAlert('Error', 'Error deleting post!');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  submitComment() {
    if (this.newComment.text && this.selectedPost) {
      this.newComment.createdAt = new Date();
      this.forumService
        .addComment(this.selectedPost.id, this.newComment)
        .then(() => {
          this.newComment.text = '';
        });
    }
  }

  onBackButtonClick() {
    if (this.currentUserType === 'veterinarian') {
      this.router.navigate(['/vet-dashboard']);
    } else if (this.currentUserType === 'farmer') {
      this.router.navigate(['/farmers-dashboard']);
    }
  }

  showAlert(title: string, message: string) {
    this.alertController
      .create({
        header: title,
        message: message,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }
  

}