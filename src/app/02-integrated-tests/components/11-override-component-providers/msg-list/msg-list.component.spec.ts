/**
 * Тестирование компонента с подменой сервиса,
 * который зарегистрирован в компоненте
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsgListComponent } from './msg-list.component';
import { MsgListService } from './msg-list.service';
import { By } from '@angular/platform-browser';

// stub MsgListServiceStub
const msgListServiceStub = {
  getMessges(): any[] {
    return [{ id: 1, msg: 'Hi, TestUser1' }, { id: 2, msg: 'Hi, TestUser2' }];
  }
};

describe('MsgListComponent', () => {
  let fixture: ComponentFixture<MsgListComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsgListComponent]
    })

      // Меняем провайдера сервиса компонента
      .overrideComponent(MsgListComponent, {
        set: {
          providers: [{ provide: MsgListService, useValue: msgListServiceStub }]
        }
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgListComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('.msg')).nativeElement;
  });

  it('should display Hi, TestUser1', () => {
    expect(el.textContent).toBe('Hi, TestUser1');
  });
});
