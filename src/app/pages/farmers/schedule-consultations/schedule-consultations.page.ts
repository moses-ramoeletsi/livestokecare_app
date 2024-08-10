import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-consultations',
  templateUrl: './schedule-consultations.page.html',
  styleUrls: ['./schedule-consultations.page.scss'],
})
export class ScheduleConsultationsPage implements OnInit {

  showSchedule: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleShowSchedule(){
    this.showSchedule = !this.showSchedule;
  }
}
