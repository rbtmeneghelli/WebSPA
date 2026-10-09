import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';
import { SnackBarService } from '../services/snackBar.service';
import { EnumTypeMessage, EnumActionMessage } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly _AuthGuardService: AuthGuardService =
    inject(AuthGuardService);
  private readonly _SnackBarService: SnackBarService = inject(SnackBarService);

  canActivate(): Observable<boolean> {
    return this._AuthGuardService.isAuthenticated().pipe(
      map((authenticated) => {
        if (!authenticated && !!localStorage.getItem('userLoggedData')) {
          this._SnackBarService.sendSnackBarNotificationRoute(
            '',
            EnumTypeMessage.TokenExpired,
            EnumActionMessage.Info,
            true,
            'login',
          );
        }
        return authenticated;
      }),
    );
  }
}
