import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient)
  
  getAllProducts(pageNumber: number = 1, brandId?: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`, {
      params: {
        page: pageNumber,
        ...(brandId ? { brand: brandId } : {})
      }
    });
  }
  getSpecificProduct(id:string | null) : Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
