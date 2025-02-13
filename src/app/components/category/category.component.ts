import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CategoriesService } from '../../services/category/categories.service';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductComponent, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: ICategory[];
  selectedCatId: number;
  constructor(private _categoryService: CategoriesService) {
    this.categories = [] as ICategory[];
    this.selectedCatId = 0;
  }

  ngOnInit() {
    this._categoryService.getAll().subscribe({
      next: (cats) => (this.categories = cats),
    });
  }
}
