import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-modal.component.html',
  styleUrl: './map-modal.component.scss'
})
export class MapModalComponent {
  @Input() isVisible: boolean = false;  // Görünürlük kontrolü
  currentStep = 1;

  // Adımlar arasında geçiş yapma fonksiyonları
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  closeModal() {
    this.isVisible = false
  }
}
