import { Injectable } from '@angular/core';import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}