import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/category/categories.service';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  categories: ICategory[];
  newProduct: IProduct;
  constructor(
    private _categoriesService: CategoriesService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.categories = [] as ICategory[];
    this.newProduct = {} as IProduct;
  }

  ngOnInit(): void {
    this._categoriesService.getAll().subscribe({
      next: (res) => (this.categories = res),
    });
    this._activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        if (paramMap.get('id') != null) {
          let id = paramMap.get('id') ?? '1';
          this._productService.getProductById(id).subscribe({
            next: (cur) => {
              this.newProduct.catId = cur.catId;
              this.newProduct.price = cur.price;
              this.newProduct.id = cur.id;
              this.newProduct.name = cur.name;
              this.newProduct.quantity = cur.quantity;
              this.newProduct.status = cur.status;
            },
          });
        }
      },
    });
  }

  addProduct() {
    if (this.newProduct.id == undefined) {
      this._productService.getAllIds().subscribe({
        next: (res) => {
          let maxId = res[res.length-1];
          this.newProduct.id = String(+maxId+1);
          this.newProduct.status = this.newProduct.quantity > 0;
          this._productService.addNewProduct(this.newProduct).subscribe({
            next: () => this.router.navigate(['product']),
          });
        }
      })
    } else {
      this.newProduct.status = this.newProduct.quantity > 0;
      this._productService
        .updateProduct(this.newProduct.id, this.newProduct)
        .subscribe({
          next: () => this.router.navigate(['product']),
        });
    }
  }
}
