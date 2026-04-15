import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { AuthGuardService } from '../../core/services/auth-guard.service';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { ToolBarIconsComponent } from '../../shared/components/toolbar-icons/toolbar-icons.component';
import { ForgetPasswordComponent } from '../../modules/forget-password/forget-password.component';
import { LoginComponent } from '../../modules/login/login.component';
import { UserCreateComponent } from '../../modules/user-create/user-create.component';
import { UsersAddComponent } from '../../modules/users/users-add.component';
import { UsersListComponent } from '../../modules/users/users-list.component';
import { NotificationService } from '../../core/services/notification.service';
import { ProductCardComponent } from '../product-card/product-card';
import { Product } from '../product';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
    ProductCardComponent,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './products-grid.component.html',
  providers: [NotificationService],
})
export class ProductsGridComponent {
  protected readonly searchTerm = signal('');

  protected readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'XPTO',
      description: 'Este produto e fake',
      price: 10.0,
      orginalPrice: 100.99,
    },
    {
      id: 2,
      name: 'XYZ',
      description: 'Este produto e fake II',
      price: 20.99,
    },
    {
      id: 3,
      name: 'ABC',
      description: 'Este produto e fake III',
      price: 30.0,
      orginalPrice: 300.99,
    },
  ]);

  protected clearSearch() {
    this.searchTerm.set('');
  }

  protected trimSearch() {
    this.searchTerm.update((value: string) => value.trim());
  }
}
