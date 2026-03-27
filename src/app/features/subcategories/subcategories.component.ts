import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategory } from '../../core/models/ICategroy/icategory.interface';
import { CategoryService } from '../../core/services/category/category.service';

@Component({
  selector: 'app-subcategories',
  imports: [RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
})
export class SubcategoriesComponent implements OnInit {

  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute); // 👈 add this

  categoryList: WritableSignal<ICategory[]> = signal([]);
  brandInfo: WritableSignal<ICategory | null> = signal(null); 
  ngOnInit(): void {
    const categoryId = this.activatedRoute.snapshot.params['id'];
    this.getSubCategories(categoryId);
    this.getCategoryInfo(categoryId); // 👈 add this
  }
  
  getCategoryInfo(categoryId: string) {
    this.categoryService.getSpecificCategory(categoryId).subscribe({
      next: (res) => {
        this.brandInfo.set(res.data); // 👈 now has name + image
      },
      error: (err) => console.log(err)
    });
  }

  getSubCategories(categoryId: string) {
    this.categoryService.getSpecificSubCategory(categoryId).subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}