import { SnackBarService } from './../services/snackBar.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { CONSTANT_HTTP_STATUS_CODE } from '../constants/http-status.constant';
import { EnumTypeMessage, EnumActionMessage } from '../enums/enums';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authGuardService: AuthGuardService, private router: Router, private snackBarService: SnackBarService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle((req)).pipe(
            map(event => (event)),
            catchError(e => {
                if (e.status === CONSTANT_HTTP_STATUS_CODE.UNAUTHORIZED) {
                    if (this.authGuardService.isAuthenticated()) {
                        this.authGuardService.logout();
                    }
                    this.router.navigate(['/login']);
                }

                if (e.status === CONSTANT_HTTP_STATUS_CODE.FORBIDDEN) {
                    this.snackBarService.sendSnackBarNotification('Acesso negado', EnumTypeMessage.Personalized, EnumActionMessage.Error, false);
                }
                return throwError(e);
            })
        );
    }
}
