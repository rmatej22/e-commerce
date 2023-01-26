import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort: string = "sort";
  itemsShowCount: number = 12;

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colNum: number): void {
    this.columnsCountChange.emit(colNum);
  }
}
