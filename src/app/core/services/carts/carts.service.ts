import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private readonly httpClient = inject(HttpClient);

  numberOfCartItems : WritableSignal<number> = signal(0)


addProductToCart(productId: string): Observable<any> {
  return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, {
    productId: productId
  });
}

getLoggedUserCart() : Observable<any> {
  return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`);
}
removeSpecificCartItem(itemId : string)  : Observable<any> {
  return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${itemId}`);
}

clearUserCart() : Observable<any> {
  return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
}

updateCartProductQuantity(itemId : string , itemCount :string) : Observable<any> {
  return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${itemId}` , {
    count: itemCount
});
}

  // 7aga t3rf ellocalhost ely ana aleha esmaha origin
checkoutSession(cartId : string , data :any) : Observable<any> {
  return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}` , data)
}
}
