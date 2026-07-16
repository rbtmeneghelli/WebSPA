import { CartItem } from '../../examples/chart-item';
import { Product } from './../../examples/product';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  private readonly cartItems = signal<CartItem[]>([]);

  readonly totalItems = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0),
  );

  addToCart(product: Product) {
    // O ...items faz que os itens do carrinho ja adicionados sejam retornados
    // A segunda propriedade faz que o produto seja adicionado a lista
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }
}
