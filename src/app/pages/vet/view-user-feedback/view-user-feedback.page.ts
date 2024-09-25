import { Component, OnInit } from '@angular/core';
import { UserFeedbackService } from 'src/app/services/user-feedback.service';

@Component({
  selector: 'app-view-user-feedback',
  templateUrl: './view-user-feedback.page.html',
  styleUrls: ['./view-user-feedback.page.scss'],
})
export class ViewUserFeedbackPage implements OnInit {

  userFeedback = {
    id: '', 
    userId: '',
    name:"",
    email:"",
    feedBackType: "",
    message:""
  };
  
  feedback: any[] = [];

  constructor(private feedbackservices: UserFeedbackService) { }

  ngOnInit() {
    this.getUserFeedBack();
  } 
  getUserFeedBack(){
    this.feedbackservices.fetchUserFeedBack().subscribe((feedback) =>{
      this.feedback = feedback;
    })
  }
}
