import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}

  onColumnsChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
