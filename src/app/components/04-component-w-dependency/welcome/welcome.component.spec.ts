import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { UserService } from "app/components";

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService;
  let de: DebugElement;
  let el: HTMLElement;

  // stub UserService for test purposes
  const userServiceStub = {
    isLoggedIn: true,
    user: { name: 'Test User' }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [{ provide: UserService, useValue: userServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    // Service is injected in module
    userService = TestBed.get(UserService);

    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Vitaliy"', () => {
    userService.user.name = 'Vitaliy'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Welcome Vitaliy');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });
});
