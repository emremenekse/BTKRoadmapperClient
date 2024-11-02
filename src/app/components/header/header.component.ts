import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { MapModalComponent } from '../map-modal/map-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MapModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isModalVisible: boolean = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
