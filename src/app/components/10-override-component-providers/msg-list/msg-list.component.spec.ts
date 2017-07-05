import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgListComponent } from './msg-list.component';
import { MsgListService } from './msg-list.service';
import { By } from '@angular/platform-browser';

// stub MsgListServiceStub
const msgListServiceStub = {
  getMessges() {
    return [
      { 'id': 1, 'msg': 'Hi, TestUser1' },
      { 'id': 2, 'msg': 'Hi, TestUser2' }
    ];
  }
};

describe('MsgListComponent', () => {
  let component: MsgListComponent,
      fixture: ComponentFixture<MsgListComponent>,
      el: HTMLElement;

  beforeEach(async(() => {
    TestBed
      // Конфигурируем модуль
      .configureTestingModule({
        declarations: [MsgListComponent]
      })

      // Меняем провайдера сервиса компонента
      .overrideComponent(MsgListComponent, {
        set: {
          providers: [
            { provide: MsgListService, useValue: msgListServiceStub }
          ]
        }
      })
      // Компилируем шаблоны и стили
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('.msg')).nativeElement;

  });

  it('should display Hi, TestUser1', () => {
    expect(el.textContent).toBe('Hi, TestUser1');
  });
});
