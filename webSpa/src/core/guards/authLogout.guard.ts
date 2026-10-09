import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { LayoutComponent } from "../../modules/layout/layout.component";

@Injectable({
  providedIn: "root",
})
export class AuthLogoutGuard implements CanDeactivate<LayoutComponent> {
  constructor(private authGuardService: AuthGuardService) {}

  canDeactivate(
    component: LayoutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): boolean {
    if (nextState?.url === "/login") {
      this.authGuardService.logout();
      return true;
    } else {
      return false;
    }
  }
}
