import { inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

//  Стаб для роутера
//  Описываем/используем только тот метод, который используется
import { RouterStub } from './../../../../testing-helpers';

import { ProductListService } from './product-list.service';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product/product.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent,
    fixture: ComponentFixture<ProductListComponent>,
    productEl: DebugElement;

  /**
   *  Используем синхронный beforeEach, так как тесты запускаются с помощью Angular CLI,
   *  а он в свою очередь компилирует проект перед запуском тестов.
   *  В таком случае компиляция компонентов, вызов метода compileComponents(), не нужна.
   */

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductComponent],
      providers: [
        // Тут используем либо реальный сервис, либо фейковый,
        // В даном случае это для нас не важно
        { provide: ProductListService, useClass: ProductListService },

        // Тут используем стаб для роутера
        { provide: Router, useClass: RouterStub }
      ]
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    // Запускаем первоначальную инициализацию компонента
    fixture.detectChanges();

    // Находим элемент product
    productEl = fixture.debugElement.query(By.css('app-product'));
  });

  it('should tell ROUTER to navigate when product clicked' /**
     * inject функция это утилита Angular для тестирования.
     * Она внедряет сервисы в тестовую функцию
     * Дальше можно использовать спай или манипулировать ими.

     * inject функция имеет два параметра:
     * 1. Массив токенов для внедрения.
     * 2. Тест-функция, чьи параметры соответствуют токенам
     * inject([Class1, ..., ClassN], (instance1, ..., instanceN) => { testing code })
     *
     * В этом тесте мы внедряем Router с текущего TestBed инжектора.
     *
     * Если нужен сервис, который внедряется в компонент,
     * то необходимо его получить так fixture.debugElement.injector.get
     */, inject(
    [Router],
    (router: Router) => {
      const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

      /**
       *  1. запускаем клик на первом внутреннем <div class="product">
       *  2. получаем аргументы переданные router.navigateByUrl()
       *  3. строим урл для сравнения
       */

      productEl.triggerEventHandler('selected', component.products[0]);
      const navArgs = navigateByUrlSpy.calls.first().args[0];
      const id = component.products[0].id;

      expect(navArgs).toBe(
        '/product/' + id,
        'should nav to ProductDetail for first product'
      );
    }
  ));
});
