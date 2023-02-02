import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getAllProducts(
    limit = "12",
    sort = "desc",
    category?: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${STORE_BASE_URL}/products${
        category ? "/category/" + category : ""
      }?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${STORE_BASE_URL}/products/categories`);
  }
}
