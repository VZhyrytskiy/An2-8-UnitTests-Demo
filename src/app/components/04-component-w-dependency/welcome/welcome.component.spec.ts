import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let welcomeService: WelcomeService;
  let de: DebugElement;
  let el: HTMLElement;

  // stub WelcomeService for test purposes
  const welcomeServiceStub = {
    isLoggedIn: true,
    user: { name: 'Test User' }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [{ provide: WelcomeService, useValue: welcomeServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    // Service is injected in module
    welcomeService = TestBed.get(WelcomeService);

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
    welcomeService.user.name = 'Vitaliy'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Welcome Vitaliy');
  });

  it('should request login if not logged in', () => {
    welcomeService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });
});
