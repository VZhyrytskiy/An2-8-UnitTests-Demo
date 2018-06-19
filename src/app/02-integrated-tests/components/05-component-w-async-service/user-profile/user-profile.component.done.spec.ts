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
    userProfileService: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [UserProfileService]
    });

    fixture = TestBed.createComponent(UserProfileComponent);

    // Получаем реальный сервис из инджектора компонента
    userProfileService = fixture.debugElement.injector.get(UserProfileService);

    // Получаем элемент по селектору
    de = fixture.debugElement.query(By.css('.user-profile'));
    el = de.nativeElement;
  });

  /**
   * Традиционные техники Jasmine для асинхронного тестирования
   * Вы не можете использовать async или fakeAsync для тестов
   * которые используют intervalTimer, например когда тестируем
   * async Observable методы
   */

  it('should show user profile after getUser promise (done)', (done: DoneFn) => {
    const getUserSpy = spyOn(userProfileService, 'getUser').and.returnValue(
      Promise.resolve(testUser)
    );
    // Запускаем ngOnInit
    fixture.detectChanges();

    // Получаем промис, который возвращает шпион и ждем его результата
    getUserSpy.calls.mostRecent().returnValue.then(() => {
      // Запускаем передачу данных в шаблон
      fixture.detectChanges();

      expect(el.textContent).toBe(
        `User Name: ${testUser.firstName} ${testUser.lastName}`
      );
      // Вызываем колбек
      done();
    });
  });
});
