import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface ModalButton {
  text: string;
  route: string;
}
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() message?: string;
  @Input() buttons?: ModalButton[];
  @Input() showCloseButton: boolean = false; 
 @Input() title?: string; 
  constructor(private router: Router, public activeModal: NgbActiveModal) {}

  navigate(route: string): void {
    this.activeModal.close();
    if (route === this.router.url) {
      window.location.reload();
    } else {
      this.router.navigate([route]);
    }
  }
}
