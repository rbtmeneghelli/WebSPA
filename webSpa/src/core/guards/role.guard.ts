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

    private authGuardService: AuthGuardService = inject(AuthGuardService);
    private snackBarService: SnackBarService = inject(SnackBarService);
    private router: Router = inject(Router);

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.authGuardService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }

        else if (this.authGuardService.isAuthenticated() && this.authGuardService.isTokenExpired()) {
            this.router.navigate(['/login']);
            return false;
        }

        const role = next.data['roles'] as string;

        if (this.authGuardService.hasRole(role)) {
            return true;
        } else {
            this.snackBarService.sendSnackBarNotification('Você não possui acesso a este recurso!', EnumTypeMessage.Personalized, EnumActionMessage.Error, false);
            return false;
        }
    }
}
