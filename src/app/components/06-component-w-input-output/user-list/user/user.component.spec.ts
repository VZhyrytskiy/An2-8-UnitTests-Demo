import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { click } from './../../../../testing-helpers';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userEl: DebugElement;
  let expectedUser: string;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents(); // compile templates
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    // find user element
    userEl = fixture.debugElement.query(By.css('.user'));

    // pretend that it was wired to something that supplied a user
    expectedUser = 'Test User';
    component.user = expectedUser;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should display user name', () => {
    const expectedPipedName = expectedUser.toUpperCase();
    expect(userEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    let selectedUser: string;
    component.selected.subscribe((user: string) => selectedUser = user);

    // The Angular DebugElement.triggerEventHandler can raise any
    // data - bound event by its event name.
    // The second parameter is the event object passed to the handler.
    userEl.triggerEventHandler('click', null);
    expect(selectedUser).toBe(expectedUser);
  });

  it('should raise selected event when clicked (click helper)', () => {
    let selectedUser: string;
    component.selected.subscribe((user: string) => selectedUser = user);

    click(userEl);   // triggerEventHandler helper
    expect(selectedUser).toBe(expectedUser);
  });

});
