import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent,
      fixture: ComponentFixture<UserProfileComponent>,
      de: DebugElement,
      el: HTMLElement,

      userProfileService: UserProfileService,
      spy: jasmine.Spy;

  // Объект, описывает тестового пользователя
  const testUser = {
    firstName: 'Test',
    lastName: 'Test'
  };

  // Асинхронный beforeEach: настройка модуля
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],

      // Внедряем реальный сервис
      providers: [UserProfileService]
    })
      .compileComponents();
  }));

  // setup service
  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    // Получаем реальный сервис из инджектора компонента
    userProfileService = fixture.debugElement.injector.get(UserProfileService);

    // Создаем шпиона (spy) на метод `getUser` нашего реального сервиса
    // и просим его возвращать данные о тестовом пользователе.
    // Таким образом, все, кто обращаются к даному методу,
    // сразу же получают ответ, а реальный запрос на сервер,
    // ожидание ответа или прочие асинхроные действия не происходят.
    // spyOn(obj, methodName) -> spy
    // https://jasmine.github.io/api/2.6/global.html#spyOn
    spy = spyOn(userProfileService, 'getUser')
      // and.returnValue() - попросим вернуть значение, когда будет вызываться
      // https://jasmine.github.io/api/2.6/Spy_and.html
      .and.returnValue(Promise.resolve(testUser));

    // Получаем элемент по селектору
    de = fixture.debugElement.query(By.css('.user-profile'));
    el = de.nativeElement;
  });

  // синхронный тест
  it('should not show user profile before OnInit', () => {
    expect(el.textContent).toBe('User Name: ', 'nothing displayed');
    // шпион не вызывался
    // spy.calls.any() - проверяем вызывался ли шпион
    // https://jasmine.github.io/api/2.6/Spy_calls.html
    expect(spy.calls.any()).toBe(false, 'getUser not yet called');
  });

  // синхронный тест
  it('should still not show user profile after component initialized', () => {
    fixture.detectChanges();
    // userProfileService асинхронныей => результат мы не увидим
    expect(el.textContent).toBe('User Name:  ', 'no user yet');
    // шпион вызывался, так как мы вызвали fixture.detectChanges();
    expect(spy.calls.any()).toBe(true, 'getUser called');
  });

  // Ни один из тестов выше не может доказать, что отображается
  // значение из сервиса. Данные о пользователе не пришли,
  // несмотря на то, что шпион возвращает разрешенное значение.

  // Этот тест должен ждать по крайней мере одного полного цикла
  // JavaScript - движка до того, как значение станет доступным.
  // Тест должен стать асинхронным.

  // Асинхронный тест.
  // Использует функцию async(), как выше асинхронный beforeEach
  it('should show user profile after getUser promise (async)', async(() => {
    fixture.detectChanges();

    // fixture.whenStable метод возвращает промис,
    // который резолвится, когда getUser промис завершит работу.

    // Ждем результата асинхронного метода getUser
    fixture.whenStable().then(() => { //
      // Запускаем следующий цикл обнаружения изменений
      // чтобы наполнить представление полученными данными
      fixture.detectChanges();

      expect(el.textContent).toBe(`User Name: ${testUser.firstName} ${testUser.lastName}`);
    });
  }));

  // Тест проверяте тоже самое, но делат это по другому.
  // Он использует fakeAsync() + tick() функции
  // fakeAsync() функция позволяет использовать линейный стиль кода,
  // так как она запускает тест в специальной fakeAsync test zone.
  // Нет then(...)
  // А fixture.whenStable заменил вызов функции tick().
  // Несколько ограничений: например, вы не сможете выполнить XHR вызов
  // в функции fakeAsync().
  it('should show user profile after getUser promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();

    // Ждем выполнения асинхронного метода getUser
    // Вызвать эту функцию можно только в рамках тела fakeAsync функции
    tick();

    // Запускаем обнаружение изменений для передачи данных в темплейт
    fixture.detectChanges();

    expect(el.textContent).toBe(`User Name: ${testUser.firstName} ${testUser.lastName}`);
  }));

  // Традиционные техники Jasmine для асинхронного тестирования
  // Вы не можете использовать async или fakeAsync для тестов
  // которые используют intervalTimer, например когда тестируем
  // async Observable методы
  it('should show user profile after getUser promise (done)', (done: any) => {
    fixture.detectChanges();

    // Получаем промис, который возвращает шпион и ждем его результата
    spy.calls.mostRecent().returnValue.then(() => {
      // Вызываем обнаружение изменений для обновления темплейта
      fixture.detectChanges();

      expect(el.textContent).toBe(`User Name: ${testUser.firstName} ${testUser.lastName}`);
      // Вызываем колбек
      done();
    });
  });

});
