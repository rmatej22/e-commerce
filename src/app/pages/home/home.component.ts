import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { CartService } from "src/app/services/cart.service";

const ROWS_HEGHT: { [id: number]: number } = {
  1: 400,
  2: 335,
  3: 350,
};
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols: number = 3;
  rowHeight: number = ROWS_HEGHT[this.cols];
  category!: string | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onColumnsChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}
