import { SnackBarService } from './../services/snackBar.service';
import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { CONSTANT_HTTP_STATUS_CODE } from '../constants/http-status.constant';
import { EnumTypeMessage, EnumActionMessage } from '../enums/enums';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly _AuthGuardService: AuthGuardService = inject(AuthGuardService);
    private readonly _Router: Router = inject(Router);
    private readonly _SnackBarService: SnackBarService = inject(SnackBarService);

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle((req)).pipe(
            map(event => (event)),
            catchError(e => {
                if (e.status === CONSTANT_HTTP_STATUS_CODE.UNAUTHORIZED) {
                    if (this._AuthGuardService.isAuthenticated()) {
                        this._AuthGuardService.logout();
                    }
                    this._Router.navigate(['/login']);
                }

                if (e.status === CONSTANT_HTTP_STATUS_CODE.FORBIDDEN) {
                    this._SnackBarService.sendSnackBarNotification('Acesso negado', EnumTypeMessage.Personalized, EnumActionMessage.Error, false);
                }
                return throwError(e);
            })
        );
    }
}
