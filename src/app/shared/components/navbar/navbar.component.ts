import { Component, computed, inject, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { Router, RouterLink } from "@angular/router";
import { CartsService } from '../../../core/services/carts/carts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  mobileMenuOpen : WritableSignal<boolean> = signal(false);
  cartItems : Signal<number> = computed(()=>this.cartsService.numberOfCartItems())
  wishlistItems : Signal<number> = computed(()=>this.wishlistService.numberOfWishlistItems())
    private readonly authService = inject(AuthService);
  private readonly cartsService = inject(CartsService)
  private readonly wishlistService = inject(WishlistService)
  private readonly router = inject(Router)
  private readonly spinner = inject(NgxSpinnerService)
  private readonly platformId = inject(PLATFORM_ID)


  toggleMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen)
  }

  isLoggedIn : Signal<boolean> = computed( ()=>this.authService.isLoggedIn() )


  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getLoggedUserCart()
    this.checkUser()
    this.getLoggedUserWishlist();
  }

  getLoggedUserCart(){
    this.cartsService.getLoggedUserCart().subscribe({
      next : (res)=>{
        console.log(res);
        this.cartsService.numberOfCartItems.set(res.numOfCartItems)
      },
      error : (err)=>{
        console.log(err);
      }

    })
  }
  checkUser() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')!=undefined) {
        this.authService.isLoggedIn.set(true)
        this.getLoggedUserCart()
      }
      else{
        this.authService.isLoggedIn.set(false)
      }
    }
  }

  logout(){
    this.spinner.show()
    setTimeout(() => {
      localStorage.removeItem('token')

      this.router.navigate(['/login'])

      this.spinner.hide()

      this.authService.isLoggedIn.set(false)

    }, 1500);

  }
  getLoggedUserWishlist() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistService.numberOfWishlistItems.set(res.count);
      },
      error: (err) => console.log(err)
    });
  }

}
