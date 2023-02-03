import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart";
import { CartService } from "src/app/services/cart.service";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 1,
      },
    ],
  };
  dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onReduceQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.cartService.onCheckout(this.cart.items).subscribe(async (res: any) => {
      let stripe = await loadStripe(
        "pk_test_51MXOzPICklmwdoiXxMjWwN85n5qIHcpkviDxANEaeW1sj3Aso54qMvE2k6c8fAUzJCrDHT13RIjzZhV1BfZMGOmp00j98YIPps"
      );
      stripe?.redirectToCheckout({
        sessionId: res.id,
      });
    });
  }
}
