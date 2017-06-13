import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent,
    fixture: ComponentFixture<UserComponent>,
    userEl: DebugElement;
  const expectedUser = 'Test User';

  // асинхронный beforeEach
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ UserComponent ]
      })
      // Компилируемтемплейт
      .compileComponents();
  }));

  // Синхронный beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    // Ищем user элемент по селектору
    userEl = fixture.debugElement.query(By.css('.user'));

    // Предположим, что мы получили пользователя на вход
    component.user = expectedUser;

    // Запускаем обнаружение изменений для первоначальной привязки данных
    fixture.detectChanges();
  });


  // Тест проверяет, что пользователь передается в шаблон
  // через property binding
  // В шаблоне используется пайп, тест должен проверить результат
  // в нужном регистре
  it('should display user name', () => {
    const expectedPipedName = expectedUser.toUpperCase();
    expect(userEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    let selectedUser: string;
    component.selected.subscribe((user: string) => selectedUser = user);

    // DebugElement.triggerEventHandler может сгенерить любое связанное
    // с данными событие по имени события.
    // Второй параметр - это объект события, переданный обработчику.
    // В этом примере тест запускает событие «click»
    // с наловым объектом события.
    userEl.triggerEventHandler('click', null);
    expect(selectedUser).toBe(expectedUser);
  });
});
