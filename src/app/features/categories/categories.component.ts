import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryCardComponent } from "../../shared/components/category-card/category-card.component";
import { CategoryService } from '../../core/services/category/category.service';
import { ICategory } from '../../core/models/ICategroy/icategory.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [ RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit{

  private readonly categoryService = inject(CategoryService)
  categoryList : WritableSignal <ICategory[]> = signal([])
  ngOnInit(): void {
    this.getAllCategories()
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
