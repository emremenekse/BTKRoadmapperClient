import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private readonly minimumDisplayTime = 300;
  show() {
    this.isLoadingSubject.next(true);
  }

  hide() {
    of(null)
      .pipe(delay(this.minimumDisplayTime), finalize(() => this.isLoadingSubject.next(false)))
      .subscribe();
  }
}
