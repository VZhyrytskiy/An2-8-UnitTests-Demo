import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Импортируем специальный токен для настройки автоматического запуска
// обнаружения изменений
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { HeaderInlineAutoCdComponent } from './header-inline-auto-cd.component';

describe('HeaderInlineAutoCdComponent', () => {
  let component: HeaderInlineAutoCdComponent,
    fixture: ComponentFixture<HeaderInlineAutoCdComponent>,
    de: DebugElement,
    el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderInlineAutoCdComponent],
      // Добавим ComponentFixtureAutoDetect токен и настроем его
      // для использования автоматического запуска обнаружения изменений
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    });

    fixture = TestBed.createComponent(HeaderInlineAutoCdComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original title', () => {
    // Ручной запуск обнаружения изменений не требуется
    expect(el.textContent).toContain(component.title);
  });

  // Этот тест показывает важное ограничение
  it('should still see original title after component.title change', () => {
    const oldTitle = component.title;
    component.title = 'Test Title';

    // Будет отображаться старое значение title потому что
    // Angular не видит изменений сделанных синхронно
    // ComponentFixtureAutoDetect сервис реагирует на асинхронные действия
    // такие как
    // - Promise resove/reject,
    // - Таймеры,
    // - DOM события.
    // Прямое синхронное изменения свойства компонента невидимо.
    expect(el.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    // синхронное изменение
    component.title = 'Test Title';
    // явный запуск обнаружения изменений вызванных синхронным изменением свойства компонента

    fixture.detectChanges();

    // Получаем новые значения
    expect(el.textContent).toContain(component.title);
  });
});
