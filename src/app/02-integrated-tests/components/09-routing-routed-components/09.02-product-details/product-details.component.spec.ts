import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterStub, ActivatedRouteStub } from './../../../../testing-helpers';

import { ProductDetailsComponent } from './product-details.component';
import { ProductListService } from './../09.01-product-list/product-list.service';

/* Блок переменных */
let activatedRouteStub: ActivatedRouteStub;
let component: ProductDetailsComponent;
let fixture: ComponentFixture<ProductDetailsComponent>;
let idDisplay: HTMLElement;
let nameDisplay: HTMLElement;
let expectedProduct: any;
let gotoSpy: jasmine.Spy;
let navSpy: jasmine.Spy;

const firstProduct = { id: '1', name: 'Apple' };

describe('ProductDetailsComponent', () => {
  beforeEach(() => {
    activatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProductListService, useClass: ProductListService },
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  describe('when navigate to existing product', () => {
    beforeEach(async () => {
      expectedProduct = firstProduct;
      activatedRouteStub.testParams = { id: expectedProduct.id };
      await createComponent();
    });

    it('should display tasks\'s id and name', () => {
      expect(idDisplay.textContent).toBe(expectedProduct.id);
      expect(nameDisplay.textContent).toBe(expectedProduct.name);
    });
  });

  describe('when navigate with no product id', () => {
    beforeEach(waitForAsync(createComponent));

    it('should have product.id === 0', () => {
      console.log(component.product);
      expect(component.product.id).toBe(0);
    });

    it('should display no name', () => {
      expect(nameDisplay.textContent).toBe('No Name');
    });
  });

  describe('when navigate to non-existant product id', () => {
    beforeEach(async () => {
      activatedRouteStub.testParams = { id: 99999 };
      await createComponent();
    });

    it('should try to navigate back to product list', () => {
      console.log(gotoSpy.calls.any());
      expect(gotoSpy.calls.any()).toBe(true, 'component.gotoList called');
      expect(navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
});

// Вспомагательная функция
function createComponent() {
  fixture = TestBed.createComponent(ProductDetailsComponent);
  component = fixture.componentInstance;

  // Получаем роутер с рутового инжектора
  const router = TestBed.inject(Router);
  gotoSpy = spyOn(component, 'gotoList').and.callThrough();
  navSpy = spyOn(router, 'navigate');

  // Первый цикл запускает ngOnInit, который получает product
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // Второй цикл отображает полученные products
    fixture.detectChanges();
    if (component.product) {
      idDisplay = fixture.debugElement.queryAll(By.css('span'))[0].nativeElement;
      nameDisplay = fixture.debugElement.queryAll(By.css('span'))[1]
        .nativeElement;
    }
  });


}
