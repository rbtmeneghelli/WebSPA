import { Product } from './../../examples/product';
import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProductCartService {

  private readonly cartItems = signal<Product[]>([]);

  addToCart(product: Product){
    // O ...items faz que os itens do carrinho ja adicionados sejam retornados
    // A segunda propriedade faz que o produto seja adicionado a lista
    this.cartItems.update((items: Product[]) => [...items, product]);
  }
}
