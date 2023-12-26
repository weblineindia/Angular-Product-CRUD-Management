import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + 'getAllProducts');
  }

  getProductById(product: number) : Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + `getProductById/${product}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.baseUrl + 'addProduct', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(environment.baseUrl + `editProduct/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(environment.baseUrl + `deleteProduct/${productId}`);
  }
}
