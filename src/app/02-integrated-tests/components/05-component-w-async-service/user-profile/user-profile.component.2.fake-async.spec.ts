/**
 * Тестирвание компонента с асинхронным сервисом.
 * Утилита fakeAsync + tick.
 */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
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
  let fixture: ComponentFixture<UserProfileComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let userProfileService: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [UserProfileService]
    });

    fixture = TestBed.createComponent(UserProfileComponent);
    userProfileService = fixture.debugElement.injector.get(UserProfileService);
  });

  /**
   * Тест проверяте тоже самое, но делат это по другому.
   * Он использует fakeAsync() + tick() функции
   *
   * fakeAsync() функция позволяет использовать линейный стиль кода,
   * так как она запускает тест в специальной fakeAsync test zone.
   * Нет then(...)
   * А fixture.whenStable заменил вызов функции tick().
   *
   * Несколько ограничений: например, вы не сможете выполнить XHR вызов
   * в функции fakeAsync().
   */

  it(
    'should show user profile after getUser promise (fakeAsync)',
    fakeAsync(() => {
      spyOn(userProfileService, 'getUser').and.returnValue(
        Promise.resolve(testUser)
      );
      // Получаем элемент по селектору
      de = fixture.debugElement.query(By.css('.user-profile'));
      el = de.nativeElement;

      // Запускаем ngOnInit
      fixture.detectChanges();

      // Ждем выполнения асинхронного метода getUser
      // Вызвать эту функцию можно только в рамках тела fakeAsync функции
      tick();

      // Запускаем передачу данных в шаблон
      fixture.detectChanges();

      expect(el.textContent).toBe(
        `User Name: ${testUser.firstName} ${testUser.lastName}`
      );
    })
  );
});
