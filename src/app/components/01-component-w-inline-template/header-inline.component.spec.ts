// Импортируем утилиты Ангуляр для тестирования
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Импортируем наш компонент для тестирования
import { HeaderInlineComponent } from './header-inline.component';

// Используем название компонента в первом параметре функции describe
// второй параметр - стрелочная функция
describe('HeaderInlineComponent', () => {

  // Объявляем необходимые переменные
  let component: HeaderInlineComponent,
      fixture: ComponentFixture<HeaderInlineComponent>,
      de: DebugElement,
      el: HTMLElement;

  // beforeEach выполниться перед каждым тестом
  // TestBed утилита, которая используется дальше
  // будет сбрасивать свое состояние в базовое перед каждым тестом
  beforeEach(() => {

    // Отсоединяем компонент от его модуля и
    // присоединяем его к динамически сконструированому модулю
    // Метод configureTestingModule принимает объект,
    // который похож на объект, который принимает декоратор @NgModule()
    TestBed.configureTestingModule({
      declarations: [HeaderInlineComponent]
    });

    // После конфигурирования модуля создаем компонент для тестирования.
    // Метод createComponent создает ComponentFixture - дескриптор тестовой среды,
    // окружающей созданный компонент
    // Переконфигурировать модуль после вызова этого метода уже не получится.
    fixture = TestBed.createComponent(HeaderInlineComponent);

    // ComponentFixture предоставляет доступ к экземпляру компонента
    component = fixture.componentInstance;

    // ComponentFixture предоставляет доступ к DebugElement - дескриптором
    // элемента DOM компонента
    // Получение DebugElement происходит посредством метода query
    // Метод query возвращает первый найденный элемент, который удовлетворяет
    // функции-предикату.
    // Существует также метод queryAll, который
    // возвращает массив всех DebugElements, которые удовлетворяют функции-предикату.
    // Класс By - это Ангуляр утилита для тестирования, которая создает
    // разные полезные предикаты.
    // Статический метод By.css создает стандартный предикат селектора CSS,
    // который работает так же как и селектор jQuery.
    de = fixture.debugElement.query(By.css('h1'));

    // Получаем элемент DOM с помощью свойства nativeElement
    el = de.nativeElement;
  });


  it('should display original title', () => {
    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // (change detection)
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';

    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // но уже после того, какпроинициализировали компонент новым значением
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    // TestBed.createComponent не вызывает автоматически detectChanges()
    expect(el.textContent).toEqual('');
  });

});
