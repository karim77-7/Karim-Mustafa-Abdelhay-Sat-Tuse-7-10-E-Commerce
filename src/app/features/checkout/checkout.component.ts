import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CartsService } from '../../core/services/carts/carts.service';


@Component({
  selector: 'app-checkout',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

  checkoutForm! : FormGroup
  private readonly fB = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartsService = inject(CartsService);
  cartId : WritableSignal<any>=signal('')
  ngOnInit(): void {
    this.checkoutFunction()
     this.activatedRoute.paramMap.subscribe({
      next : (urlPath)=>{
         this.cartId.set(urlPath.get('cartId'))
      }  
     }) 
  }

  checkoutFunction(){
    this.checkoutForm = this.fB.group({
      details : [null , Validators.required],
      phone : [null , Validators.required],
      city : [null , Validators.required]
   })
  }

  checkoutSession(){
    let payload = {
      shippingAddress : this.checkoutForm.value
    }
    this.cartsService.checkoutSession(this.cartId(),payload).subscribe({
      next : (res)=>{
        console.log(res);
        if(res.status == 'success'){
          window.open(res.session.url , '_self')
        }
      },
      error : (err)=>{
        console.log(err);
        
      }
    })
  }


}
