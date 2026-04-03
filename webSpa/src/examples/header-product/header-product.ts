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
import { ForgetPasswordComponent } from "../../modules/forget-password/forget-password.component";
import { LoginComponent } from "../../modules/login/login.component";
import { UserCreateComponent } from "../../modules/user-create/user-create.component";
import { UsersAddComponent } from "../../modules/users/users-add.component";
import { UsersListComponent } from "../../modules/users/users-list.component";
import { NotificationService } from "../../core/services/notification.service";
import { ProductsGridComponent } from "../products-grid/products-grid";


@Component({
  selector: 'app-header-product',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, MatTooltipModule, ProductsGridComponent, SideBarComponent, ToolBarIconsComponent],
  templateUrl: './header-product.component.html',
  providers: [NotificationService]
})

export class HeaderProductComponent {
  private _AuthGuardService: AuthGuardService = inject(AuthGuardService);

  title = 'WebSPA';

  isAuthenticated() {
    return this._AuthGuardService.isAuthenticated();
  }
}

