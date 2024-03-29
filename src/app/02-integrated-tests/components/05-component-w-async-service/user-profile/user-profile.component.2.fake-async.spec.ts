/**
 * Тестирвание компонента с асинхронным сервисом.
 * Утилита fakeAsync + tick.
 */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';
import { of, defer, delay, interval, take } from 'rxjs';

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
      'getUserAsObservable',
    ]);

    // Make the spy return a synchronous Promise or Observable with the testUserProfile
    getUserAsPromiseSpy = userProfileSpyObj.getUserAsPromise.and.returnValue(
      Promise.resolve(testUserProfile)
    );
    getUserAsObservableSpy =
      userProfileSpyObj.getUserAsObservable.and.returnValue(
        // of(testUserProfile)  // sync observable
        defer(() => of(testUserProfile)) // async observable
      );

    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [{ provide: UserProfileService, useValue: userProfileSpyObj }],
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
    dePromise = fixture.debugElement.query(
      By.css('.user-profile-promise > span:nth-child(2)')
    );
    elPromise = dePromise.nativeElement;
    deObservable = fixture.debugElement.query(
      By.css('.user-profile-observable > span:nth-child(2)')
    );
    elObservable = deObservable.nativeElement;

    fixture.detectChanges(); // ngOnInit()

    // Ждем выполнения асинхронного метода getUserAsPromise
    // Вызвать эту функцию можно только в рамках тела fakeAsync функции
    tick();

    // Передать данные в шаблон
    fixture.detectChanges();

    expect(elPromise.textContent)
      .withContext('user is displayed (promise)')
      .toBe('TestFirstName TestLastName');
    expect(elObservable.textContent)
      .withContext('user is displayed (observable)')
      .toBe('TestFirstName TestLastName');
  }));

  // Если в тесте используется setTimeout с некоторым временем, то в
  // функцию tick() необходимо передать это время
  it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
    let called = false;
    setTimeout(() => {
      called = true;
    }, 10_000);

    tick(10_000); // pass 10000ms = 10c

    expect(called).toBe(true);
  }));

  it('should call nested setTimeout automatically', fakeAsync(() => {
    let nestedTimeoutInvoked = false;
    function funcWithNestedTimeout() {
      setTimeout(() => {
        nestedTimeoutInvoked = true;
      });
    }
    setTimeout(funcWithNestedTimeout);
    tick(0, { processNewMacroTasksSynchronously: true }); // true - call nested setTimeout
    expect(nestedTimeoutInvoked).toBe(true);
    flush(); // clear a queue of a timers
  }));

  it('shouldnt call nested setTimeout: call it manually', fakeAsync(() => {
    let nestedTimeoutInvoked = false;
    function funcWithNestedTimeout() {
      setTimeout(() => {
        nestedTimeoutInvoked = true;
      });
    }
    setTimeout(funcWithNestedTimeout);
    tick(0, { processNewMacroTasksSynchronously: false }); // false - don't call nested setTimeout
    expect(nestedTimeoutInvoked).toBe(false);

    tick(0); // call setTimeout if needed
    expect(nestedTimeoutInvoked).toBe(true);
    flush(); // clear a queue of a timers
  }));

  it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
    let result = '';
    of('hello')
      .pipe(delay(1000))
      .subscribe((v) => {
        result = v;
      });
    expect(result).toBe('');
    tick(1000);
    expect(result).toBe('hello');

    const start = new Date().getTime();
    let dateDiff = 0;
    interval(1000)
      .pipe(take(2))
      .subscribe(() => (dateDiff = new Date().getTime() - start));

    tick(1000);
    expect(dateDiff).toBe(1000);
    tick(1000);
    expect(dateDiff).toBe(2000);
  }));
});
