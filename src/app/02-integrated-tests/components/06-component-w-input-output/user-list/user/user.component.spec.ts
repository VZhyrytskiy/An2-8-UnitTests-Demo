/**
 * Тестирование компонента с инпутами и аутпутами
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserComponent } from './user.component';
import { first } from 'rxjs';
import { click } from './../../../../../testing-helpers';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userEl: DebugElement;
  const expectedUser = 'Test User';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    // Ищем user элемент по селектору
    userEl = fixture.debugElement.query(By.css('.user'));
  });

  // Важно! Иногда может возникать ошибка Uncaught TypeError: Cannot read property of undefined thrown
  // проблема в том что не очищается значение fixture после каждого теста
  afterEach(() => {
    fixture.destroy();
  });

  // Тест проверяет, что пользователь передается в шаблон
  // через property binding
  // В шаблоне используется пайп, тест должен проверить результат
  // в нужном регистре
  it('should display user name', () => {
    // Предположим, что мы получили пользователя на вход
    component.user = expectedUser;

    // Запускаем обнаружение изменений для первоначальной привязки данных
    fixture.detectChanges();

    const expectedPipedName = expectedUser.toUpperCase();
    expect(userEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    let selectedUser: string | undefined;
    // Предположим, что мы получили пользователя на вход
    component.user = expectedUser;

    // Запускаем обнаружение изменений для первоначальной привязки данных
    fixture.detectChanges();

    // selected - looks like sync Observable
    component.selected.pipe(first()).subscribe((user: string) => (selectedUser = user));

    // DebugElement.triggerEventHandler может сгенерить любое связанное
    // с данными событие по имени события.
    // Второй параметр - это объект события, переданный обработчику.
    // В этом примере тест запускает событие «click»
    // с наловым объектом события.

    // userEl.triggerEventHandler('click', null);
    // or
    // userEl.nativeElement.click();
    // or use testing-helpers function
    click(userEl);

    expect(selectedUser).toBe(expectedUser);
  });


});
