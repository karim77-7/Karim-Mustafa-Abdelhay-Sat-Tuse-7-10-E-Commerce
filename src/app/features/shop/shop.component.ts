import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IProducts } from '../../core/models/IProducts/iproducts.interface';
import { isPlatformBrowser } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'
import { ProductsService } from '../../core/services/proudcts/products.service';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCardComponent , NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {

  ngOnInit(): void {
    this.getAllProducts();
  }

  productList : WritableSignal <IProducts[]> = signal([])
  pageSize : WritableSignal <number> = signal(0)
  p : WritableSignal <number> = signal(0)
  total : WritableSignal <number> = signal(0)
  private readonly productsService = inject(ProductsService)


  getAllProducts(pageNumber : number = 1){
    this.productsService.getAllProducts(pageNumber).subscribe({
      next : (res)=>{
        console.log(res);   
        this.productList.set(res.data)
        this.pageSize.set(res.metadata.limit)
        this.p.set(res.metadata.currentPage)
        this.total.set(res.results)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
