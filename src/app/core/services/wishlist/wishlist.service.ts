import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient)
  numberOfWishlistItems = signal<number>(0);
  

  getLoggedUserWishlist():Observable <any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }
  removeProductFromWishlist(productId : string):Observable <any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
  }
  addProductToWishlist(data : any):Observable <any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, data)
  }
}
