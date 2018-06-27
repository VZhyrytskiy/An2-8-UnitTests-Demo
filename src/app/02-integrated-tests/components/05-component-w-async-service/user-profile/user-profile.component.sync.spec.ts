/**
 * Тестирование компонента с асинхронным сервисом
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';

// Тестовый пользователь
const testUser = {
  firstName: 'Test',
  lastName: 'Test'
};

describe('UserProfileComponent', () => {
  let fixture: ComponentFixture<UserProfileComponent>,
    de: DebugElement,
    el: HTMLElement,
    userProfileService: UserProfileService,
    getUserSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [UserProfileService]
    });

    fixture = TestBed.createComponent(UserProfileComponent);

    // Получаем реальный сервис из инджектора компонента
    userProfileService = fixture.debugElement.injector.get(UserProfileService);

    /**
     * Создаем шпиона (spy) на метод `getUser` нашего реального сервиса
     * и просим его возвращать данные о тестовом пользователе.
     * and.returnValue() - попросим вернуть значение, когда будет вызываться
     * https://jasmine.github.io/api/2.6/Spy_and.html
     *
     * Таким образом, все, кто обращаются к даному методу,
     * сразу же получают ответ, а реальный запрос на сервер,
     * ожидание ответа или прочие асинхроные действия не происходят.
     *
     * spyOn(obj, methodName) -> spy
     * https://jasmine.github.io/api/2.6/global.html#spyOn
     */
    getUserSpy = spyOn(userProfileService, 'getUser').and.returnValue(
      Promise.resolve(testUser)
    );

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
    expect(getUserSpy.calls.any()).toBe(false, 'getUser not yet called');
  });

  // синхронный тест
  it('should still not show user profile after component initialized', () => {
    fixture.detectChanges();

    // userProfileService асинхронныей => результат мы не увидим
    expect(el.textContent).toBe('User Name:  ', 'no user yet');
    // шпион вызывался, так как мы вызвали fixture.detectChanges();
    expect(getUserSpy.calls.any()).toBe(true, 'getUser called');
  });

  // Ни один из тестов выше не может доказать, что отображается
  // значение из сервиса. Данные о пользователе не пришли,
  // несмотря на то, что шпион возвращает разрешенное значение.

  // Этот тест должен ждать по крайней мере одного полного цикла
  // JavaScript - движка до того, как значение станет доступным.
  // Тест должен стать асинхронным.
});
