import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly httpClient = inject(HttpClient)

  getAllBrands(pageNumber : number) : Observable <any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands` , {
      params : {
        page :pageNumber
      }
    }
   )
  }
  

  getSpecificBrandProducts(brandId : string) : Observable <any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${brandId}`)
  }
}
