import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient)


  getUserOrders(id: string): Observable<any> {
  return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
}
}
