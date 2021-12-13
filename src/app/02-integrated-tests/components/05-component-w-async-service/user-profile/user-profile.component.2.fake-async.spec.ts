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
import { of, defer } from 'rxjs';

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
      providers: [{ provide: UserProfileService, useValue: userProfileSpyObj }]
    });

    fixture = TestBed.createComponent(UserProfileComponent);
  });

  /**
   * Тест использует fakeAsync() + tick() функции
   *
   * fakeAsync() функция позволяет использовать линейный стиль кода,
   * так как она запускает тест в специальной fakeAsync test zone.
   *
   * Несколько ограничений: например, вы не сможете выполнить XHR вызов
   * в функции fakeAsync().
   */

  it('should show user profile after getUserAsPromise/getUserAsObservable (fakeAsync)', fakeAsync(() => {
    // Получаем элементы по селектору
    dePromise = fixture.debugElement.query(By.css('.user-profile-promise > span:nth-child(2)'));
    elPromise = dePromise.nativeElement;
    deObservable = fixture.debugElement.query(By.css('.user-profile-observable > span:nth-child(2)'));
    elObservable = deObservable.nativeElement;

    fixture.detectChanges(); // ngOnInit()

    // Ждем выполнения асинхронного метода getUserAsPromise
    // Вызвать эту функцию можно только в рамках тела fakeAsync функции
    tick();

    // Запускаем передачу данных в шаблон
    fixture.detectChanges();

    expect(elPromise.textContent).toBe('TestFirstName TestLastName', 'user is displayed');
    expect(elObservable.textContent).toBe('TestFirstName TestLastName', 'user is displayed');
  }));

  // Если в тесте используется setTimeout с некоторым временем, то в
  // функцию tick() необходимо передать это время
  it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
    let called = false;
    setTimeout(() => { called = true; }, 100);

    tick(100); // pass 100ms

    expect(called).toBe(true);
  }));
});
