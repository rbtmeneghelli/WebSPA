import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductCartService } from '../../core/services/product-cart.service';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';

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
  templateUrl: './products-grid.html',
  providers: [NotificationService],
})
export class ProductsGridComponent {

  protected readonly searchTerm = signal('');

  private readonly productCartService = inject(ProductCartService);

  protected readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'XPTO',
      description: 'Este produto e fake',
      price: 10.0,
      originalPrice: 100.99,
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
      originalPrice: 300.99,
    },
  ]);

  protected filteredProducts = computed(() => {
    const term = this.searchTerm().toLocaleLowerCase().trim();
    if (!term) return this.products();

    this.products().filter(
      (product) =>
        product.name.toLocaleLowerCase().includes(term) ||
        product.description.toLocaleLowerCase().includes(term),
    );
  });

  protected clearSearch() {
    this.searchTerm.set('');
  }

  protected onAddToCart(product: Product) {
    console.log('Add produto no carrinho: ', product.name);
    this.productCartService.addToCart(product);
  }
}


