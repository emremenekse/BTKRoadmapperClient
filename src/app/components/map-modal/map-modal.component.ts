import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoadmapDTO } from '../../interfaces/RoadmapDTO';
import { FormsModule } from '@angular/forms';
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { UserDTO } from '../../interfaces/userDTO';

@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './map-modal.component.html',
  styleUrl: './map-modal.component.scss'
})
export class MapModalComponent {
  constructor(private roadmapService: RoadmapService) {
    
  }
  @Input() isVisible: boolean = false;  
  @Output() modalClosed = new EventEmitter<void>();  
  estimatedCompletionTime: number = 0;
  readonlyEmail: boolean = false;
  currentStep = 1;
  roadmapDTO: RoadmapDTO = {
    email: '',
    name: '',
    role: '',
    interestedFields: '',
    educationLevel: 1,
    interestedFieldSkillLevel: 1,
    dailyAvailableTime: 1,
    targetField: 1,
    isUser: false,
    hasUserInfoChange: false
  };
  initialUserData: Partial<RoadmapDTO> = {};
  roadmapData: any[] = []; 
  showRoadmapPopup = false;
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
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  checkEmail() {
    if (!this.emailPattern.test(this.roadmapDTO.email!)) {
      alert('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    this.roadmapService.getUserInfoByEmail(this.roadmapDTO.email!).subscribe((response: UserDTO | null) => {
      if (response && response.email && response.email !== "") {
        this.roadmapDTO.isUser = true; 
        this.readonlyEmail = true; 

        this.initialUserData = {
          name: response.name,
          role: response.role,
          dailyAvailableTime: response.availableHoursPerDaily,
          interestedFields: response.interestedFields,
          educationLevel: response.educationLevel,
          interestedFieldSkillLevel: response.interestedFieldSkillLevel,
          targetField: response.targetField
        };

        this.roadmapDTO.name = response.name;
        this.roadmapDTO.role = response.role;
        this.roadmapDTO.dailyAvailableTime = response.availableHoursPerDaily;
        this.roadmapDTO.interestedFields = response.interestedFields;
        this.roadmapDTO.educationLevel = response.educationLevel;
        this.roadmapDTO.interestedFieldSkillLevel = response.interestedFieldSkillLevel;
        this.roadmapDTO.targetField = response.targetField;

      } else {
        this.roadmapDTO.isUser = false; 
      }
      this.nextStep();
    });
  }

  nextStep() {
    if (this.currentStep === 2 && (!this.roadmapDTO.name || !this.roadmapDTO.role)) {
      alert("İsim ve Rol alanları boş geçilemez.");
      return;
    }

    if (this.currentStep === 7 && !this.roadmapDTO.interestedFields) {
      alert("İlgi alanı bilgisi boş geçilemez.");
      return;
    }

    if (this.currentStep < 7) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  validateDailyAvailableTime() {
    if (this.roadmapDTO.dailyAvailableTime < 1) {
      alert("Günlük ilgilenebileceğiniz saat en az 1 olmalıdır.");
      this.roadmapDTO.dailyAvailableTime = 1; 
    }
  }
  submitData() {
    
    if (!this.roadmapDTO.interestedFields) {
      alert("İlgi alanı bilgisi boş geçilemez.");
      return;
    } else if (this.roadmapDTO.interestedFields.length > 200) {
      alert("İlgi alanı bilgisi 200 karakterden fazla olamaz.");
      return;
    }
    this.roadmapDTO.educationLevel = Number(this.roadmapDTO.educationLevel);
    this.roadmapDTO.interestedFieldSkillLevel = Number(this.roadmapDTO.interestedFieldSkillLevel);
    this.roadmapDTO.targetField = Number(this.roadmapDTO.targetField);
    if (this.roadmapDTO.isUser) {
      this.roadmapDTO.hasUserInfoChange = this.hasUserInfoChanged();
    }
  
    this.roadmapService.generateRoadmap(this.roadmapDTO).subscribe(response => {
      if (response) {
        this.roadmapData = response.sort((a, b) => a.recommendedOrder - b.recommendedOrder);
        this.estimatedCompletionTime = this.calculateEstimatedTime(this.roadmapData);
        this.showRoadmapPopup = true;
        this.closeModal();
      }
    });
  }
  calculateEstimatedTime(courses: any[]): number {
    const totalSeconds = courses.reduce((totalTime, course) => totalTime + course.totalRequeiredTimeInSeconds, 0);
    const adjustedTimeInSeconds = totalSeconds * 2;
    const totalDays = adjustedTimeInSeconds / 86400; 
    return Math.ceil(totalDays); 
}
  hasUserInfoChanged(): boolean {
    return (
      this.roadmapDTO.name !== this.initialUserData.name ||
      this.roadmapDTO.role !== this.initialUserData.role ||
      this.roadmapDTO.dailyAvailableTime !== this.initialUserData.dailyAvailableTime ||
      this.roadmapDTO.interestedFields !== this.initialUserData.interestedFields ||
      this.roadmapDTO.educationLevel !== this.initialUserData.educationLevel ||
      this.roadmapDTO.interestedFieldSkillLevel !== this.initialUserData.interestedFieldSkillLevel ||
      this.roadmapDTO.targetField !== this.initialUserData.targetField
    );
  }
  closeModal() {
    this.modalClosed.emit();
    
    this.roadmapDTO = {
        email: '',
        name: '',
        role: '',
        interestedFields: '',
        educationLevel: 1,
        interestedFieldSkillLevel: 1,
        dailyAvailableTime: 1,
        targetField: 1,
        isUser: false,
        hasUserInfoChange: false
    };

    this.currentStep = 1;
    this.readonlyEmail = false;
    this.initialUserData = {};
}
closeRoadMapModal(){
  this.showRoadmapPopup = false;

}
}
