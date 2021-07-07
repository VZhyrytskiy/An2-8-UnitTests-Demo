import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductListService } from './../product-list/product-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private productListService: ProductListService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: Params) => this.getProduct(p && p.id));
  }

  gotoList(): void {
    this.router.navigate(['/']);
  }

  private getProduct(id: string): void {
    // when no id or id===0, create new Product
    if (!id) {
      this.product = { id: 0, name: 'no name' };
      return;
    }

    this.product = this.productListService.getProduct(+id);
    if (!this.product) {
      this.gotoList(); // id not found; navigate to list
    }
  }

}
