
// Импортируем дополнительную Ангуляр утилиту тестирования async
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent,
      fixture: ComponentFixture<HeaderComponent>,
      de: DebugElement,
      el: HTMLElement;

  // Предыдущая логика работы beforeEach разбита на два beforeEach
  // Первый beforeEach - асинхронный для настроки модуля,
  // загрузки шаблонов, компиляции компонентов
  // В асинхронном beforeEach используется функция async(),
  // которая в свою очередь принимает стрелочную функцию в качестве параметра
  beforeEach(async(() => {
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
