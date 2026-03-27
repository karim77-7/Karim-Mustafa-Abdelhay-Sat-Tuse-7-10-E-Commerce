import { Component, inject, signal, WritableSignal, OnInit, OnDestroy } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { IBrandsDetails } from '../../core/models/IBrandsDetails/ibrands-details.interface';
import { ProductsService } from '../../core/services/proudcts/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brand } from '../../core/models/IProducts/iproducts.interface';

@Component({
  selector: 'app-brands-details',
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.css',
})
export class BrandsDetailsComponent implements OnInit, OnDestroy {
  brandsList: WritableSignal<IBrandsDetails[]> = signal([]);
  private productService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private routeSub!: Subscription;
  brandInfo: WritableSignal<Brand | null> = signal(null);  

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe({
      next: (params) => {
        const brandId = params['id']; 
        this.getProductsByBrand(brandId);
      }
    });
  }

  getProductsByBrand(brandId: string) {
    this.productService.getAllProducts(1, brandId).subscribe({
      next: (res) => {
        this.brandsList.set(res.data);
        console.log(this.brandsList());
        this.brandInfo.set(res.data[0]?.brand ?? null);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}