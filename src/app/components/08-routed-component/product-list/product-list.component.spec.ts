import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

import { ProductListService } from './product-list.service';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product/product.component';

//  Стаб для роутера
//  Описываем только тот метод, который используется
class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent,
      fixture: ComponentFixture<ProductListComponent>,
      productEl: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ProductListComponent,
          ProductComponent
        ],
        providers: [
          // Тут используем либо реальный сервис, либо фейковый,
          // В даном случае это для нас не очень важно
          { provide: ProductListService, useClass: ProductListService },

          // Тут используем стаб для роутера
          { provide: Router, useClass: RouterStub }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    // Запустим первоначальную инициализацию компонента
    fixture.detectChanges();

    // Найдем элемент product
    productEl = fixture.debugElement.query(By.css('app-product'));
  });

  it('should tell ROUTER to navigate when product clicked',
    // inject функция внедряет сервисы в тест-функцию
    // Дальше можно использовать спай или манипулировать им.

    // inject функция имеет два параметра:
    // 1. Массив токенов для внедрения.
    // 2. Тест-функция, чьи параметры соответствуют токенам
    // Тут мы внедряем Router с текущего TestBed инжетора.
    // Если нужен сервис, который внедряется в компонент,
    // то необходимо его получить так fixture.debugElement.injector.get
    inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');

      // запускаем клик на первом внутреннем <div class="product">
      productEl.triggerEventHandler('selected', component.products[0]);

      // получаем аргументы переданные router.navigateByUrl()
      const navArgs = spy.calls.first().args[0];

      // строим урл для сравнения
      const id = component.products[0].id;
      expect(navArgs).toBe('/product/' + id,
        'should nav to ProductDetail for first product');
    })
  );
});

