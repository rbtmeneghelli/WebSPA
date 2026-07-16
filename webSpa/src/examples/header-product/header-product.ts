import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterOutlet } from "@angular/router";
import { AuthGuardService } from "../../core/services/auth-guard.service";
import { SideBarComponent } from "../../shared/components/side-bar/side-bar.component";
import { ToolBarIconsComponent } from "../../shared/components/toolbar-icons/toolbar-icons.component";
import { NotificationService } from "../../core/services/notification.service";
import { ProductsGridComponent } from "../products-grid/products-grid";
import { ProductCartService } from "../../core/services/product-cart.service";
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-header-product',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, MatTooltipModule, ProductsGridComponent, SideBarComponent, ToolBarIconsComponent, MatBadgeModule],
  templateUrl: './header-product.html',
  providers: [NotificationService]
})

export class HeaderProductComponent {
  protected readonly _AuthGuardService: AuthGuardService = inject(AuthGuardService);
  protected readonly _CartService = inject(ProductCartService);

  title = 'WebSPA';

  isAuthenticated() {
    return this._AuthGuardService.isAuthenticated();
  }
}

