import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../core/models/IBrands/ibrands.interface';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllBrands();
  }
  private readonly brandsService = inject(BrandsService)
  brandsList : WritableSignal <IBrands[]> = signal([])
  pageSize : WritableSignal <number> = signal(0)
  p : WritableSignal <number> = signal(0)
  total : WritableSignal <number> = signal(0)


  getAllBrands(pageChanged : number = 1){
    this.brandsService.getAllBrands(pageChanged).subscribe({
      next : (res)=>{
        console.log(res);
        this.brandsList.set(res.data)
        this.pageSize.set(res.metadata.limit)
        this.p.set(res.metadata.currentPage)
        this.total.set(res.results)
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }
  

}
