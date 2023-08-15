/**
 * Тестирование компонента с внешним шаблоном.
 * Замечания по поводу компиляции компонентов.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
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
   */
  beforeEach(async () => {
    await TestBed
      // Настраиваем модуль
      .configureTestingModule({
        declarations: [HeaderComponent]
      })
      // Компилируем компоненты
      .compileComponents();

    // Метод compileComponents возвращает промис
    // таким образом мы можем выполнять дополнительные задачи
    // сразу после его завершения.

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
