import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgListComponent } from './msg-list.component';
import { MsgListService } from './msg-list.service';
import { By } from '@angular/platform-browser';

// stub MsgListServiceSpy for test purposes
const msgListServiceSpy = {
  getMessges() {
    return [
      { 'id': 1, 'msg': 'Hi, TestUser1' },
      { 'id': 2, 'msg': 'Hi, TestUser2' }
    ];
  }
};

describe('MsgListComponent', () => {
  let component: MsgListComponent;
  let fixture: ComponentFixture<MsgListComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed
      // Configure module
      .configureTestingModule({
        declarations: [MsgListComponent]
      })

      // Override component's own provider
      .overrideComponent(MsgListComponent, {
        set: {
          providers: [
            { provide: MsgListService, useValue: msgListServiceSpy }
          ]
        }
      })
      // Compile templates and styles
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
