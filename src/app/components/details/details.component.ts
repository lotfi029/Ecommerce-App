import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { CurrencyPipe } from '@angular/common';
import { ProductViewModel } from '../../viewModel/product-view-model';
import { CategoriesService } from '../../services/category/categories.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{
  productId: string;
  product: IProduct;
  productVM: ProductViewModel;
  ids: string[];
  constructor(
    private _productService: ProductService,
    private _activedRoute: ActivatedRoute,
    private _categoryService: CategoriesService,
    private _router: Router
  ) {
    this.productId = '1';
    this.product = {} as IProduct;
    this.productVM = {} as ProductViewModel;
    this.ids = [] as string[];
  }

  ngOnInit() {
    this._activedRoute.paramMap.subscribe((paramMap) => {
      // this.productId = Number(paramMap.get('id')) ?? 1;
      this.productId = paramMap.get('id') ?? '1';
      this._productService.getProductById(this.productId).subscribe({
        next: (prd) => this.productView(prd)
      })
    });
    this._productService.getAllIds().subscribe({
      next: (identities) => {
        this.ids = identities
      }
    })
  }
  productView(model: IProduct) {
    this._categoryService.getById(model.catId).pipe(map((cate) => cate.name)).subscribe({
      next: (categoryName) => {
        this.productVM.id = model.id;
        this.productVM.name = model.name;
        this.productVM.price = model.price;
        this.productVM.quentity = model.quantity;
        this.productVM.status = model.status;
        this.productVM.imgUrl = model.imgUrl;
        this.productVM.category = categoryName;
      }
    })
  }
  nextProduct() {
    let currentIdx = this.ids.findIndex((e) => e == this.productId);

    if(currentIdx <= this.ids.length - 2) {
      currentIdx++;
      this._router.navigate(['details', this.ids[currentIdx]])
    }
  }
  prevProduct() {
    
    let currentIdx = this.ids.findIndex((e) => e == this.productId);

    if(currentIdx > 0) {
      currentIdx--;
      this._router.navigate(['details', this.ids[currentIdx]])
    }
  }
}
