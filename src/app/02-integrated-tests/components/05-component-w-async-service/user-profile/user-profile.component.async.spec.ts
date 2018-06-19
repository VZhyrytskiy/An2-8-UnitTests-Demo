import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

      // Внедряем реальный сервис
      providers: [UserProfileService]
    });

    fixture = TestBed.createComponent(UserProfileComponent);
    userProfileService = fixture.debugElement.injector.get(UserProfileService);
  });

  // Использует функцию async()
  it('should show user profile after getUser promise (async)', async(() => {
    spyOn(userProfileService, 'getUser').and.returnValue(
      Promise.resolve(testUser)
    );

    // Получаем элемент по селектору
    de = fixture.debugElement.query(By.css('.user-profile'));
    el = de.nativeElement;

    // Запускаем ngOnInit
    fixture.detectChanges();

    /**
     * fixture.whenStable метод возвращает промис,
     * который резолвится, когда getUser метод завершит работу.
     * Ждем результата асинхронного метода getUser
     */
    fixture.whenStable().then(() => {
      // Запускаем передачу данных в шаблон
      fixture.detectChanges();

      expect(el.textContent).toBe(
        `User Name: ${testUser.firstName} ${testUser.lastName}`
      );
    });
  }));
});

/**
 * Дополнительный пример async + setTimeout
 */
describe('Async function', () => {
  it('should make our test wait until all asynchronous operations are completed', async(() => {
    setTimeout(() => {
      expect(true).toBe(true);
    }, 2000);
  }));
});
