/**
 * Тестирвание компонента с асинхронным сервисом.
 * Утилита async.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { defer, of } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';

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

  // Использует функцию async()
  it('should show user profile after getUserAsPromise/getUserAsObservable (async)', async(() => {
    fixture.detectChanges();  // ngOnInit

    /**
     * fixture.whenStable метод возвращает промис,
     * который резолвится, когда getUserAsPromise и getUserAsObservable завершат работу.
     * Ждем результатов асинхронных методов
     */
    fixture.whenStable().then(() => {
      // Запускаем передачу данных в шаблон
      fixture.detectChanges();

      expect(elPromise.textContent).toBe('User Name: TestFirstName TestLastName', 'user is displayed');
      expect(elObservable.textContent).toBe('User Name: TestFirstName TestLastName', 'user is displayed');
    });
  }));

  // Использует функцию async function + await
  it('should show user profile after getUser promise (async function + await)', async () => {
    fixture.detectChanges(); // ngOnInit()

    await fixture.whenStable();

    // Запускаем передачу данных в шаблон
    fixture.detectChanges();

    expect(elPromise.textContent).toBe('User Name: TestFirstName TestLastName', 'user is displayed');
    expect(elObservable.textContent).toBe('User Name: TestFirstName TestLastName', 'user is displayed');
  });
});
