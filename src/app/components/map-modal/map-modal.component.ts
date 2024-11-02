import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoadmapDTO } from '../../interfaces/RoadmapDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './map-modal.component.html',
  styleUrl: './map-modal.component.scss'
})
export class MapModalComponent {
  @Input() isVisible: boolean = false;  
  @Output() modalClosed = new EventEmitter<void>();  
  currentStep = 1;
  roadmapDTO: RoadmapDTO = {
    email: '',
    name: '',
    role: '',
    interestedFields: '',
    educationLevel: 1,
    interestedFieldSkillLevel: 1,
    dailyAvailableTime: 0,
    targetField: 1,
    isUser: true,
    hasUserInfoChange: false
  };
  educationLevels = [
    { label: 'Lise', value: 1 },
    { label: 'Ön Lisans', value: 2 },
    { label: 'Lisans', value: 3 },
    { label: 'Yüksek Lisans', value: 4 },
    { label: 'Doktora', value: 5 }
  ];

  skillLevels = [
    { label: 'Tecrübesiz', value: 1 },
    { label: 'Başlangıç', value: 2 },
    { label: 'Orta', value: 3 },
    { label: 'İleri', value: 4 }
  ];

  targetFields = [
    { label: 'Web Geliştirme', value: 1 },
    { label: 'Mobil Geliştirme', value: 2 },
    { label: 'Oyun Geliştirme', value: 3 },
    { label: 'Veri Bilimi', value: 4 },
    { label: 'Yapay Zeka', value: 5 },
    { label: 'Siber Güvenlik', value: 6 }
  ];
  
  logEmail() {
    console.log('Girilen Email:', this.roadmapDTO.email);
  }

  nextStep() {
    if (this.currentStep < 7) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitData() {
    console.log('Toplanan Veriler:', this.roadmapDTO);
    this.closeModal();
  }

  closeModal() {
    this.modalClosed.emit();
  }
}
