import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-overlay" *ngIf="isLoading | async">
      <div class="loading-spinner"></div>
    </div>
  `,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading: Observable<boolean>;
  constructor(private loadingService: LoadingService) {
    this.isLoading = this.loadingService.isLoading$;
  }
}
