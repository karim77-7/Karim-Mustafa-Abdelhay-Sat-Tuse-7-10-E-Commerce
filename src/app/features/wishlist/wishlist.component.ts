import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);

  wishlistProducts: WritableSignal<any[]> = signal([]);

  ngOnInit(): void {
    this.getLoggedUserWishlist();
  }

  getLoggedUserWishlist() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log('GET wishlist:', res); // 👈
        this.wishlistProducts.set(res.data);
        this.wishlistService.numberOfWishlistItems.set(res.count);
      },
      error: (err) => console.log(err)
    });
  }
  
  removeProductFromWishlist(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.wishlistProducts.update(products => 
          products.filter(product => product.id !== productId)
        );
        // ✅ احسب العدد من الـ signal بدل res.count
        this.wishlistService.numberOfWishlistItems.set(this.wishlistProducts().length);
      },
      error: (err) => console.log(err)
    });
  }
}