/**
 * Тетирование компонента с инлайн шаблоном
 */

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
  let component: HeaderInlineComponent;
  let fixture: ComponentFixture<HeaderInlineComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
    // Важно! Этот метод не запускает автоматически обнаружение изменений.
    // Обнаружение изменений необходимо запускать вручную (fixture.detectChanges();)
    fixture = TestBed.createComponent(HeaderInlineComponent);

    // ComponentFixture предоставляет доступ к экземпляру компонента
    component = fixture.componentInstance;

    // ComponentFixture предоставляет доступ к DebugElement - дескриптору
    // элемента DOM компонента. DebugElement - это абстракция,
    // которая используется в среде тестирования отличной от браузера

    // Получение DebugElement происходит посредством метода query
    // Метод query возвращает первый найденный элемент, который удовлетворяет функции-предикату.

    // Существует также метод queryAll, который возвращает массив всех DebugElements,
    // которые удовлетворяют функции-предикату.
    // Класс By - это Ангуляр утилита для тестирования, которая создает
    // разные полезные предикаты на всех платформах для тестирования (сервер, воркер)
    // Статический метод By.css создает стандартный предикат селектора CSS,
    // который работает так же как и селектор jQuery.
    de = fixture.debugElement.query(By.css('h1'));

    // Получаем элемент DOM с помощью свойства nativeElement
    el = de.nativeElement;

    // Если тестируемая среда - только брузер, то для поиска элемента можно полагаться
    // на стандартный метод querySelector
    // el = fixture.nativeElement.querySelector('h1');
  });

  it('should create a component instance', () => {
    expect(component).toBeDefined();
  });

  it('should have no title in the DOM until manually call `detectChanges`', () => {
    // TestBed.createComponent не вызывает автоматически обнаружение изменений
    expect(el.textContent).toEqual('');
  });

  it('should display original title after detectChanges()', () => {
    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // (change detection) и передать данные из класса в темплейт
    fixture.detectChanges();

    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    // Изменяем свойство title компонента
    component.title = 'Test Title';

    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // но уже после того, как проинициализировали свойство компонента новым значением
    fixture.detectChanges();

    expect(el.textContent).toContain('Test Title');
  });
});
