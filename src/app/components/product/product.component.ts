import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../models/iproduct';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnChanges {
  products: IProduct[];
  
  @Input() categoryId: number;
  constructor(private _productService: ProductService, private _router: Router) {
    this.products = [] as IProduct[];
    this.categoryId = 0;
  }
  ngOnInit() {
    this._productService.getAllProduct().subscribe({
      next: (prds) => (this.products = prds),
    });
  }
  ngOnChanges() {
    if (this.categoryId != 0) {
      this._productService.getProductByCatId(this.categoryId).subscribe({
        next: (prd) => (this.products = prd),
      });
    } else {
      this._productService.getAllProduct().subscribe({
        next: (prds) => (this.products = prds),
      });
    }
  }
  deleteProduct(id: string) {
    this._productService.delete(id);
  }
  details(id: string) {
    this._router.navigate(['details', id]);
    // this._router.navigateByUrl(`details/${id}`)
  }
}
