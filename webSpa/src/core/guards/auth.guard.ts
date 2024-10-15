import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';
import { SnackBarService } from '../services/snackBar.service';
import { EnumTypeMessage, EnumActionMessage } from '../enums/enums';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    private readonly _AuthGuardService: AuthGuardService = inject(AuthGuardService);
    private readonly _SnackBarService: SnackBarService = inject(SnackBarService);

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this._AuthGuardService.isAuthenticated() && !this._AuthGuardService.isTokenExpired()) {
            return true;
        } else {
            this._SnackBarService.sendSnackBarNotificationRoute(
                '',
                EnumTypeMessage.TokenExpired,
                EnumActionMessage.Info,
                true,
                'login'
            );
            return false;
        }
    }
}
