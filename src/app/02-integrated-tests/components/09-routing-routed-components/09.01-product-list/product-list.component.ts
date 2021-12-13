import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[];

  constructor(
    private router: Router,
    private productListService: ProductListService
  ) { }

  ngOnInit(): void {
    this.products = this.productListService.getProducts();
  }

  gotoDetails(product: any): void {
    const url = `/product/${product.id}`;
    this.router.navigateByUrl(url);
  }

}
