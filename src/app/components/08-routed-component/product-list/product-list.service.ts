import { Injectable } from '@angular/core';

@Injectable()
export class ProductListService {

  getProducts(): any[] {
    return [
      { 'id': 1, 'name': 'Apple' },
      { 'id': 2, 'name': 'Banana' },
      { 'id': 3, 'name': 'Orange' }
    ];
  }

}
