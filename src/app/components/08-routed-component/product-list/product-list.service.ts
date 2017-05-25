import { Injectable } from '@angular/core';

const products = [
  { 'id': 1, 'name': 'Apple' },
  { 'id': 2, 'name': 'Banana' },
  { 'id': 3, 'name': 'Orange' }
];


@Injectable()
export class ProductListService {

  getProducts(): any[] {
    return products;
  }

  getProduct(id: number) {
    return products.find(el => el.id == id);
  }

}
