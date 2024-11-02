import { Injectable } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private router: Router, private modalService: NgbModal) {}

  public handleError(error?: HttpErrorResponse, customMessage?: string, customButtons?: { text: string, route: string }[], showCloseButton: boolean = false): Observable<never> {
    const errorMessage = (error?.error && error.error.ErrorMessage) || (error?.error && error.error.errorMessage) || customMessage || 'Bilinmeyen bir hata oluştu!';
    const defaultButtons = customButtons || [{ text: 'Home', route: '/' }];
    const title = 'Hata';
    const modalRef = this.modalService.open(ModalComponent);
    console.log(error);
    modalRef.componentInstance.message = errorMessage;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.buttons = defaultButtons;
    modalRef.componentInstance.showCloseButton = showCloseButton;

    return throwError(errorMessage);
  }
}
