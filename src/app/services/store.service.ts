import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import { Observable, of, tap } from "rxjs";
import { Product } from "../models/product";

const STORE_BASE_URL = "https://fakestoreapi.com";

// transferState keys
const PRODUCTS_KEY = makeStateKey<Product[]>("products");
const CATEGORIES_KEY = makeStateKey<string[]>("categories");

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  getAllProducts(
    limit = "12",
    sort = "desc",
    category?: string
  ): Observable<Product[]> {
    if (!!category) {
      return this.http.get<Product[]>(
        `${STORE_BASE_URL}/products${
          category ? "/category/" + category : ""
        }?sort=${sort}&limit=${limit}`
      );
    } else {
      if (this.transferState.hasKey(PRODUCTS_KEY)) {
        const products = this.transferState.get(PRODUCTS_KEY, null as any);
        this.transferState.remove(PRODUCTS_KEY);
        return of(products);
      } else {
        return this.http
          .get<Product[]>(
            `${STORE_BASE_URL}/products${
              category ? "/category/" + category : ""
            }?sort=${sort}&limit=${limit}`
          )
          .pipe(
            tap((products) => {
              if (isPlatformServer(this.platformId)) {
                this.transferState.set(PRODUCTS_KEY, products);
              }
            })
          );
      }
    }
  }

  getAllCategories(): Observable<string[]> {
    if (this.transferState.hasKey(CATEGORIES_KEY)) {
      const categories = this.transferState.get(CATEGORIES_KEY, null as any);
      this.transferState.remove(CATEGORIES_KEY);
      return of(categories);
    } else {
      return this.http
        .get<string[]>(`${STORE_BASE_URL}/products/categories`)
        .pipe(
          tap((categories) => {
            if (isPlatformServer(this.platformId)) {
              this.transferState.set(CATEGORIES_KEY, categories);
            }
          })
        );
    }
  }
}
