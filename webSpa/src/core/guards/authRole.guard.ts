import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import {
  EnumTypeMessage,
  EnumActionMessage,
  EnumCRUDPermission,
} from '../enums/enums';
import { AuthGuardService } from '../services/auth-guard.service';
import { SnackBarService } from '../services/snackBar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate {
  private readonly _AuthGuardService: AuthGuardService =
    inject(AuthGuardService);
  private readonly _SnackBarService: SnackBarService = inject(SnackBarService);
  private readonly _Router: Router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const funcionalityId = next.data['funcionalityId'] as number;
    const crudPermission = next.data['crudPermission'] as EnumCRUDPermission;

    return this._AuthGuardService.isAuthenticated().pipe(
      map((authenticated) => {
        if (!authenticated) {
          this._SnackBarService.sendSnackBarNotificationRoute(
            '',
            EnumTypeMessage.TokenExpired,
            EnumActionMessage.Info,
            true,
            'login',
          );
        }

        if (
          this._AuthGuardService.hasPermission(funcionalityId, crudPermission)
        ) {
          return true;
        } else {
          // tslint:disable-next-line: max-line-length
          this._SnackBarService.sendSnackBarNotification(
            'Você não possui acesso a este recurso!',
            EnumTypeMessage.Personalized,
            EnumActionMessage.Error,
            false,
          );
          return false;
        }
      }),
    );
  }
}
