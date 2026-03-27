import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/proudcts/products.service';
import { IProducts } from '../../core/models/IProducts/iproducts.interface';
import { CartsService } from '../../core/services/carts/carts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly toastrService = inject(ToastrService)



  ngOnInit(): void {
    this.getProductIdFromRoute()
  }

  productId : WritableSignal<string | null> = signal('')

  prodData : WritableSignal<IProducts>=signal({} as IProducts)
  private readonly cartsService = inject(CartsService)


  getProductIdFromRoute(){
    this.activatedRoute.paramMap.subscribe( (url)=> {

      if(url.get('id')){
      this.productId.set(url.get('id'))
      this.getSpecificProduct()
      }

    })
  }

  getSpecificProduct(){
    this.productsService.getSpecificProduct(this.productId()).subscribe({
      next : (res)=>{
        this.prodData.set(res.data)
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  addProductToCart(id : string){
    this.cartsService.addProductToCart(id).subscribe({
      next : (res)=>{
        console.log(res);
        this.toastrService.success(res.message , 'Fresh cart')
        this.cartsService.numberOfCartItems.set(res.numOfCartItems)
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }

}
