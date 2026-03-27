import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartsService } from '../../core/services/carts/carts.service';
import { ICart } from '../../core/models/ICart/icart.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartsService = inject(CartsService);

  cartDetails : WritableSignal <ICart> = signal({} as ICart)

  ngOnInit(): void {
    this.getLoggedUserCart()
  }

  getLoggedUserCart(){
    this.cartsService.getLoggedUserCart().subscribe({
      next : (res)=>{
        console.log(res);
        this.cartDetails.set(res)
      },
      error : (err)=>{
        console.log(err);
      }

    })
  }

  removeSpecificCartItem(id:string){
    this.cartsService.removeSpecificCartItem(id).subscribe({
      next : (res)=>{
        this.cartDetails.set(res)
        console.log(res);
        this.cartsService.numberOfCartItems.set(res.numOfCartItems)

      },
      error : (err)=>{
        console.log(err);
      }

    })
  }

  clearUserCart(){
    this.cartsService.clearUserCart().subscribe({
      next : (res)=>{
        if(res.message == 'success'){
          this.cartDetails.set({} as ICart)
        this.cartsService.numberOfCartItems.set(0)

        }
        console.log(res);
      },
      error : (err)=>{
        console.log(err);
      }

    })
  }

  updateCartProductQuantity(id:string , newCount:any){
    this.cartsService.updateCartProductQuantity(id , newCount).subscribe({
      next : (res)=>{
        this.cartDetails.set(res)
        console.log(res);
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }

}