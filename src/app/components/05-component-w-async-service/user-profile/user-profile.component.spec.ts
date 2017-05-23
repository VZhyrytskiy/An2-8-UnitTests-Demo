import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './../user-profile.service/user-profile.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let userProfileService: UserProfileService;// the actually injected service
  let spy: jasmine.Spy;

  const testUser = {
    firstName: 'Test',
    lastName: 'Test'
  };

  // setup module
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [UserProfileService]
    })
    .compileComponents();
  }));

  // setup service
  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    // UserProfileService actually injected into the component
    userProfileService = fixture.debugElement.injector.get(UserProfileService);

    // Setup spy on the `getUser` method
    spy = spyOn(userProfileService, 'getUser')
      .and.returnValue(Promise.resolve(testUser));

    // Get the element by CSS selector
    de = fixture.debugElement.query(By.css('.user-profile'));
    el = de.nativeElement;
  });

  // synchronous test
  it('should not show user profile before OnInit', () => {
    expect(el.textContent).toBe('User Name: ', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getUser not yet called');
  });

  // synchronous test
  it('should still not show user profile after component initialized', () => {
    fixture.detectChanges();
    // userProfileService is async => still has not returned with user
    expect(el.textContent).toBe('User Name:  ', 'no user yet');
    expect(spy.calls.any()).toBe(true, 'getUser called');
  });

  // async function
  it('should show user profile after getUser promise (async)', async(() => {
    fixture.detectChanges();
    // The fixture.whenStable method returns its own promise,
    // which resolves when the getUser promise finishes.
    fixture.whenStable().then(() => { // wait for async getUser
      // The test kicks off another round of change detection
      fixture.detectChanges();        // update view with user profile
      expect(el.textContent).toBe(`User Name: ${testUser.firstName} ${testUser.lastName}`);
    });
  }));

  // fakeAsync function
  // The fakeAsync function enables a linear coding style by running the test body in a special fakeAsync test zone.
  // There is no then(...)
  // fixture.whenStable is gone, replaced by tick().
  // There are limitations. For example, you cannot make an XHR call from within a fakeAsync.
  it('should show user profile after getUser promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();

    // wait for async getUser
    // You can only call it within a fakeAsync body
    tick();

    // update view with user profile
    fixture.detectChanges();
    expect(el.textContent).toBe(`User Name: ${testUser.firstName} ${testUser.lastName}`);
  }));

  // Traditional Jasmine asynchronous testing technique
  // You can't call async or fakeAsync when testing code
  // that involves the intervalTimer, as is common when
  // testing async Observable methods
  it('should show user profile after getUser promise (done)', (done: any) => {
    fixture.detectChanges();

    // get the spy promise and wait for it to resolve
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // update view with user profile
      expect(el.textContent).toBe(`User Name: ${testUser.firstName} ${testUser.lastName}`);
      done();
    });
  });

});
