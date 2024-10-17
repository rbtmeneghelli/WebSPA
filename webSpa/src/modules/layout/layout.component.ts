import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterOutlet } from "@angular/router";
import { AuthGuardService } from "../../core/services/auth-guard.service";
import { FooterComponent } from "../../shared/components/footer/footer-component";
import { SideBarComponent } from "../../shared/components/side-bar/side-bar.component";
import { ToolBarIconsComponent } from "../../shared/components/toolbar-icons/toolbar-icons.component";
import { ForgetPasswordComponent } from "../forget-password/forget-password.component";
import { LoginComponent } from "../login/login.component";
import { UserCreateComponent } from "../user-create/user-create.component";
import { UsersAddComponent } from "../users/users-add.component";
import { UsersListComponent } from "../users/users-list.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, MatTooltipModule,
    UsersListComponent, FooterComponent, SideBarComponent, ToolBarIconsComponent, UsersAddComponent, LoginComponent, UserCreateComponent, ForgetPasswordComponent],
  templateUrl: './layout.component.html',
})

export class LayoutComponent {
  private _AuthGuardService: AuthGuardService = inject(AuthGuardService);

  title = 'WebSPA';

  isAuthenticated() {
    return this._AuthGuardService.isAuthenticated();
  }
}

