import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalAutorize } from '../modal-autorize';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private modal: NzModalService,
      private authService: AuthenticationService,
      private notify: NzNotificationService,
      private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
            }

            if(err.status === 400) {
              console.log(err)
              this.notify.error('Error', err.error.message)
            }

            if (err.status === 403) {
              const modal = this.modal.create({
                nzTitle: 'You need to authorize or register',
                nzContent: ModalAutorize,
                nzFooter: [{
                  type: 'primary',
                  label: 'Enter',
                  onClick: () => {
                    if(modal.componentInstance.form.valid) {
                      this.authService.login(modal.componentInstance.form.value).subscribe(user => {
                        console.log(user)
                        modal.close();
                      })
                    }
                  }
                }]
              });

              
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}