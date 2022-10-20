/**
 * Тестирование директивы в рамках искусственного компонента
 */
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

// Искусственный компонент, который демонстрирует
// все способы использования директивы
@Component({
  template: `
    <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />
  `
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[]; // три элемента с директивой
  let bareH2: DebugElement; // <h2> без директивы

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    }).createComponent(TestComponent);

    // первоначальная инициализация
    fixture.detectChanges();

    // Находим все элементы с директивой
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // Находим h2 без директивы
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background "yellow"', () => {
    // взять цвет из DebugElement.styles, если среда тестирования НЕ браузер
    const bgColor = des[0].styles['backgroundColor'];
    // или взять цвет из HTMLElement.styles, если среда тестирования браузер
    // const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    // Ангуляр добавляет директиву к инджектору компонента,
    // к которому директива применяется
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    // Проще работать с nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');

    // Имитируем ввод нового значения в input
    input.value = 'green';

    // Ангуляр никак не реагирует на измененное выше значение.
    // Генерируем DOM событие, чтобы Ангуляр знал, что значение изнменилось
    input.dispatchEvent(new Event('input'));

    // Говорим Ангуляр обновить темплейт
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe(
      'green',
      'changed backgroundColor'
    );
  });

  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties['customProperty']).toBeUndefined();
  });

  it('can inject `HighlightDirective` in 1st <h2>', () => {
    const dir = des[0].injector.get(HighlightDirective);
    expect(dir).toBeTruthy();
  });

  it('cannot inject `HighlightDirective` in 3rd <h2>', () => {
    const dir = bareH2.injector.get(HighlightDirective, null);
    expect(dir).toBe(null);
  });

  // DebugElement.providerTokens должен содержать директиву
  it('should have `HighlightDirective` in 1st <h2> providerTokens', () => {
    expect(des[0].providerTokens).toContain(HighlightDirective);
  });

  it('should not have `HighlightDirective` in 3rd <h2> providerTokens', () => {
    expect(bareH2.providerTokens).not.toContain(HighlightDirective);
  });
});
