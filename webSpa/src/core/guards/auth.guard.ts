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

    private authGuardService: AuthGuardService = inject(AuthGuardService);
    private snackBarService: SnackBarService = inject(SnackBarService);

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authGuardService.isAuthenticated() && !this.authGuardService.isTokenExpired()) {
            return true;
        } else {
            this.snackBarService.sendSnackBarNotificationRoute(
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
