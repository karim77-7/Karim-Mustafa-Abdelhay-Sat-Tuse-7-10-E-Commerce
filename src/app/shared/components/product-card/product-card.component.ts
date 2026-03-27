import { Component, inject, Input, input, InputSignal, signal } from '@angular/core';
import { IProducts } from '../../../core/models/IProducts/iproducts.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { CartsService } from '../../../core/services/carts/carts.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly cartsService = inject(CartsService)
  private readonly toastrService = inject(ToastrService)
    private readonly wishlistService = inject(WishlistService)
  
  data : InputSignal<IProducts> = input.required<IProducts>()

  getStars(rating: number): string[] {
    const stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push('full');
      } else if (rating >= i - 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }

  addProductToCart(id : string){
    this.cartsService.addProductToCart(id).subscribe({
      next : (res)=>{
        console.log(res);
        this.cartsService.numberOfCartItems.set(res.numOfCartItems)
        this.toastrService.success(res.message , 'Fresh cart')
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }
  
  addProductToWishlist(productId: string) {
    this.wishlistService.addProductToWishlist({ productId }).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Fresh Cart'); // ✅ زي الـ cart
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
