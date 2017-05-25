import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

import { ProductListService } from './product-list.service';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product/product.component';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productEl: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ProductListComponent,
          ProductComponent
        ],
        providers: [
          { provide: ProductListService, useClass: ProductListService },
          { provide: Router, useClass: RouterStub }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // trigger initial data binding
    productEl = fixture.debugElement.query(By.css('app-product'));
  });

  it('should tell ROUTER to navigate when product clicked',
    // inject function injects services into the test function
    // where you can alter, spy on, and manipulate them.
    // The inject function has two parameters:
    // 1. An array of Angular dependency injection tokens.
    // 2. A test function whose parameters correspond exactly to each item in the injection token array.
    // This example injects the Router from the current TestBed injector.
    // If you need a service provided by the component's own injector,
    // call fixture.debugElement.injector.get instead
    inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');

      // trigger click on first inner <div class="product">


      productEl.triggerEventHandler('selected', component.products[0]);

      // args passed to router.navigateByUrl()
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to id of the component's first product
      const id = component.products[0].id;
      expect(navArgs).toBe('/product/' + id,
        'should nav to ProductDetail for first product');
    })
  );
});

