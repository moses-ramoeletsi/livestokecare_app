import { Component, OnInit } from '@angular/core';
import { ConsultationService } from 'src/app/services/consultation.service';

@Component({
  selector: 'app-view-consulatation-schedule',
  templateUrl: './view-consulatation-schedule.page.html',
  styleUrls: ['./view-consulatation-schedule.page.scss'],
})
export class ViewConsulatationSchedulePage implements OnInit {

  consultations: any[] = [];

  constructor(private consultationService: ConsultationService) { }

  ngOnInit() {
    this.loadConsultations();
  }

  loadConsultations() {
    this.consultationService.getAllConsultations().subscribe(data => {
      this.consultations = data;
    });
  }

  updateStatus(consultationId: string, newStatus: string) {
    this.consultationService.updateConsultationStatus(consultationId, newStatus).then(() => {
      this.loadConsultations();
    }).catch(error => {
      console.error('Error updating consultation status:', error);
    });
  }
}


