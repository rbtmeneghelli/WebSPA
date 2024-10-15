import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumTypeMessage, EnumActionMessage } from '../enums/enums';
import { AuthGuardService } from '../services/auth-guard.service';
import { SnackBarService } from '../services/snackBar.service';

@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanActivate {

    private readonly _AuthGuardService: AuthGuardService = inject(AuthGuardService);
    private readonly _SnackBarService: SnackBarService = inject(SnackBarService);
    private readonly _Router: Router = inject(Router);

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this._AuthGuardService.isAuthenticated()) {
            this._Router.navigate(['/login']);
            return false;
        }

        else if (this._AuthGuardService.isAuthenticated() && this._AuthGuardService.isTokenExpired()) {
            this._Router.navigate(['/login']);
            return false;
        }

        const role = next.data['roles'] as string;

        if (this._AuthGuardService.hasRole(role)) {
            return true;
        } else {
            this._SnackBarService.sendSnackBarNotification('Você não possui acesso a este recurso!', EnumTypeMessage.Personalized, EnumActionMessage.Error, false);
            return false;
        }
    }
}
