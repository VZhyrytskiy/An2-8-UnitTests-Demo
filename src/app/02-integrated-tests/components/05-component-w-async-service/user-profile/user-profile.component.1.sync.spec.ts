/**
 * Тестирование компонента с асинхронным сервисом
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

    const userProfileSpyObj = jasmine.createSpyObj('UserProfileService', ['getUserAsPromise', 'getUserAsObservable']);

    // Make the spy return a synchronous Promise or Observable with the testUserProfile
    getUserAsPromiseSpy = userProfileSpyObj.getUserAsPromise.and.returnValue( Promise.resolve(testUserProfile) );
    getUserAsObservableSpy = userProfileSpyObj.getUserAsObservable.and.returnValue(
      // of(testUserProfile)  // sync observable
      defer(() => Promise.resolve(testUserProfile)) // async observable
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

  // синхронный тест
  it('should not show user profile before OnInit', () => {
    expect(elPromise.textContent).toBe('User Name: ', 'user is not set');
    expect(elObservable.textContent).toBe('User Name: ', 'user is not set');

    // шпион не вызывался
    // spy.calls.any() - проверяем вызывался ли шпион
    // https://jasmine.github.io/api/2.6/Spy_calls.html
    expect(getUserAsPromiseSpy.calls.any()).toBe(false, 'getUserAsPromise not yet called');
    expect(getUserAsObservableSpy.calls.any()).toBe(false, 'getUserAsObservable not yet called');
  });

  // синхронный тест
  it('should show user profile after component initialized, but only for sync observable', () => {
    fixture.detectChanges(); // onInit()

    // Promise - асинхронный
    // Observable - синхронный
    expect(elPromise.textContent).toBe('User Name: ', 'user is not set');
    // for sync observable
    // expect(elObservable.textContent).toBe('User Name: TestFirstName TestLastName', 'user is set');
    // for async observable
    expect(elObservable.textContent).toBe('User Name: ', 'user is set');

    // шпион вызывался, так как мы вызвали fixture.detectChanges();
    expect(getUserAsPromiseSpy.calls.any()).toBe(true, 'getUserAsPromise called');
    expect(getUserAsObservableSpy.calls.any()).toBe(true, 'getUserObservable called');
  });

  // Если данные приходят синхронно, то тест может проверить их поступление,
  // например данные от синхронного Observable

  // Если данные приходят асинхронно, то тест не может доказать, что отображается
  // значение из сервиса. Данные о пользователе не пришли в шаблон,
  // несмотря на то, что шпион возвращает значение.

  // Этот тест должен ждать по крайней мере одного полного цикла
  // JavaScript - движка до того, как значение станет доступным.
  // Тест должен стать асинхронным.
});
