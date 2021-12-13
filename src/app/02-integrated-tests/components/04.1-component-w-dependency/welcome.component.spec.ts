/**
 * Тестирование компонента с зависимостью
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let welcomeService: WelcomeService;
  let de: DebugElement;
  let el: HTMLElement;
  let welcomeServiceStub: Partial<WelcomeService>;

  // Все тесты не будут использовать явную компиляцию компонентов,
  // так как запускаются с помощью Angular CLI.
  beforeEach(() => {
    // stub WelcomeService для тестирования компонента
    // часто является упрощенным подмножеством свойств,
    // поэтому можно объявить как Partial<WelcomeService>
    welcomeServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User' }
    };

    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      // Подключаем токен WelcomeService
      // но используем stub welcomeServiceStub
      providers: [{ provide: WelcomeService, useValue: welcomeServiceStub }]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    // Сервис можно получить из инжектора компонента,
    // который доступен через свойство injector у debugElement
    // Используем метод инджектора get()
    // Этот способ является безопасным и всегда работает.
    // Кроме этого, нельзя использовать welcomeServiceStub, так как это совершенно другой объект.
    welcomeService = fixture.debugElement.injector.get(WelcomeService);

    // Сервис можно получить также из корневого инжектора
    // Для этого используем TestBed.inject()
    // welcomeService = TestBed.inject(WelcomeService);

    // Получаем welcome элемент по классу
    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

  // Тест подтверждает, что stub работает.
  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;

    // Тут используем второй опциональный параметр, чтобы показать сообщение,
    // когда тест не будет пройден
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });


  // WARNING: Angular v8 - это разные объекты, но в Angular v9 - это уже один и тот же объект
  // возможно, это ошибка
  it('stub object and injected WelcomeService SHOULD NOT BE the same', () => {
    expect(welcomeServiceStub === welcomeService).toBe(true, 'doesnt work');

    // Изменение значения в стабе не меняет его в сервисе
    welcomeServiceStub.isLoggedIn = false;
    expect(welcomeService.isLoggedIn).toBe(false);
  });

  // Тест проверяет влияние изменения имени пользователя.
  it('should welcome "Vitaliy"', () => {
    // Приветствие не будет доступно до вызова detectChanges
    welcomeService.user.name = 'Vitaliy';
    fixture.detectChanges();

    expect(el.textContent).toContain('Welcome Vitaliy');
  });

  // Тест проверяет, что компонент отображает правильное
  // сообщение, когда нет зарегистрированного пользователя.
  it('should request login if not logged in', () => {
    welcomeService.isLoggedIn = false;
    fixture.detectChanges();
    const content = el.textContent;

    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });
});
