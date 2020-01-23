/**
 * Тестирвание компонента с асинхронным сервисом.
 * Колбек done.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';
import { defer, of } from 'rxjs';

describe('UserProfileComponent', () => {
  let fixture: ComponentFixture<UserProfileComponent>;
  let dePromise: DebugElement;
  let deObservable: DebugElement;
  let elPromise: HTMLElement;
  let elObservable: HTMLElement;

  let getUserAsPromiseSpy: jasmine.Spy;
  let getUserAsObservableSpy: jasmine.Spy;

  beforeEach(() => {
     // Тестовый пользователь
     const testUserProfile = 'TestFirstName TestLastName';

     const userProfileSpyObj = jasmine.createSpyObj('UserProfileService', [
       'getUserAsPromise',
       'getUserAsObservable'
     ]);

     // Make the spy return a synchronous Promise or Observable with the testUserProfile
     getUserAsPromiseSpy = userProfileSpyObj.getUserAsPromise.and.returnValue(
       Promise.resolve(testUserProfile)
     );
     getUserAsObservableSpy = userProfileSpyObj.getUserAsObservable.and.returnValue(
       // of(testUserProfile)  // sync observable
       defer(() => of(testUserProfile)) // async observable
     );

     TestBed.configureTestingModule({
       declarations: [UserProfileComponent],
       providers: [{ provide: UserProfileService, useValue: userProfileSpyObj}]
     });

     fixture = TestBed.createComponent(UserProfileComponent);

     // Получаем элементы по селектору
     dePromise = fixture.debugElement.query(By.css('.user-profile-promise'));
     elPromise = dePromise.nativeElement;
     deObservable = fixture.debugElement.query(By.css('.user-profile-observable'));
     elObservable = deObservable.nativeElement;
  });

  /**
   * Традиционные техники Jasmine для асинхронного тестирования
   * Вы не можете использовать async или fakeAsync для тестов
   * которые используют setInterval, например когда тестируем
   * async Observable методы
   */

  it('should show user profile after getUserAsPromise/getUserAsObservable (done)', (done: DoneFn) => {
    fixture.detectChanges();  // ngOnInit()

    // Получаем промис, который возвращает шпион и ждем его результата
    getUserAsPromiseSpy.calls.mostRecent().returnValue.then(() => {
      // Запускаем передачу данных в шаблон
      fixture.detectChanges();

      expect(elPromise.textContent).toBe('User Name: TestFirstName TestLastName', 'user is displayed');
      // Вызываем колбек
      done();
    });

    getUserAsObservableSpy.calls.mostRecent().returnValue.subscribe(() => {
      // Запускаем передачу данных в шаблон
      fixture.detectChanges();

      expect(elObservable.textContent).toBe('User Name: TestFirstName TestLastName', 'user is displayed');
      done();
    });
  });
});
