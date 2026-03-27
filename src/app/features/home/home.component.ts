import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsService } from '../../core/services/proudcts/products.service';
import { IProducts } from '../../core/models/IProducts/iproducts.interface';
import { CategoryCardComponent } from "../../shared/components/category-card/category-card.component";
import { CategoryService } from '../../core/services/category/category.service';
import { ICategory } from '../../core/models/ICategroy/icategory.interface';
import { register } from 'swiper/element/bundle';
import { isPlatformBrowser } from '@angular/common'; 
import { PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [ProductCardComponent,  CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements  OnInit {
  private platformId = inject(PLATFORM_ID);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      register(); // سجل السوايبر فقط في المتصفح
    }
    this.getAllCategories();
    this.getAllProducts();
  }

  productList : WritableSignal <IProducts[]> = signal([])
  categoryList : WritableSignal <ICategory[]> = signal([])

  private readonly productsService = inject(ProductsService)
  private readonly categoryService = inject(CategoryService)

  getAllProducts(){
    this.productsService.getAllProducts().subscribe({
      next : (res)=>{
        this.productList.set(res.data)
        console.log(this.productList());
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      {
        next : (res)=>{
          this.categoryList.set(res.data)
          console.log( 'All Category' , this.categoryList());
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
  }
}


