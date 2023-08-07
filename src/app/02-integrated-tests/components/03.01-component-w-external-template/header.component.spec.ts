/**
 * Тестирование компонента с внешним шаблоном.
 * Замечания по поводу компиляции компонентов.
 */

// Импортируем дополнительную Ангуляр утилиту тестирования waitForAsync
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  /**
   * Следующий код важен только для среды тестирования без Angular CLI.
   * Если вы используете Angular CLI, то компилировать компоненты нет необходимости,
   * так как компоненты компилируются Angular CLI непосредственно перед запуском тестов.
   *
   * Предыдущая логика работы beforeEach разбита на два beforeEach
   * Первый beforeEach - асинхронный для
   *  1. настроки модуля,
   *  2. загрузки шаблонов,
   *  3. компиляции компонентов
   * В асинхронном beforeEach используется функция waitForAsync(),
   * которая в свою очередь принимает стрелочную функцию в качестве параметра
   *
   */
  beforeEach(waitForAsync(() => {
    TestBed
      // Настраиваем модуль
      .configureTestingModule({
        declarations: [HeaderComponent]
      })
      // Компилируем компоненты
      .compileComponents();

    // Метод compileComponents возвращает промис
    // таким образом мы можем выполнять дополнительные задачи
    // сразу после его завершения.
    // Например, можно переместить синхронный код с второго beforeEach
    // в compileComponents().then(...) колбек
    // и оставить только один beforeEach.
    // Но предпочтительно использовать два beforeEach
  }));

  // Второй beforeEach - синхронный
  // Содержит все остальные шаги настройки компонента для тестирования
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });
});
