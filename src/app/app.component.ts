import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Cart } from "./models/cart";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  cart: Cart = {
    items: [],
  };

  constructor(
    private cartService: CartService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle("E-commerce store");

    this.meta.addTags([
      {
        name: "author",
        content: "Matej",
      },
      {
        name: "keywords",
        content: "e-commerce",
      },
      {
        name: "description",
        content: "Choose and buy your favorite products at the best prices!",
      },
    ]);

    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
