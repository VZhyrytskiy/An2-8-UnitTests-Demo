import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';

// stub WelcomeService для тестирования компонента
const welcomeServiceStub = {
  isLoggedIn: true,
  user: { name: 'Test User' }
};

describe('WelcomeComponent', () => {
  let component: WelcomeComponent,
      fixture: ComponentFixture<WelcomeComponent>,
      welcomeService: WelcomeService,
      de: DebugElement,
      el: HTMLElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [WelcomeComponent],
        // Подключаем токен WelcomeService
        // но используем stub welcomeServiceStub
        providers: [{ provide: WelcomeService, useValue: welcomeServiceStub }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    // Сервис можно получить из инджектора компонента,
    // который доступен через свойство injector у debugElement
    // Используем метод инджектора get()
    welcomeService = fixture.debugElement.injector.get(WelcomeService);

    // Сервис можно получить также из корневого инджектора
    // Для этого используем TestBed.get()
    // welcomeService = TestBed.get(WelcomeService);

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
