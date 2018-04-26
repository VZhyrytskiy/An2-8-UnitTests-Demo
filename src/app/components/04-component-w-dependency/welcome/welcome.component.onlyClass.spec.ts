import { TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';

// stub WelcomeService для тестирования компонента
const welcomeServiceStub = {
  isLoggedIn: true,
  user: { name: 'Test User' }
};

describe('WelcomeComponent', () => {
  let component: WelcomeComponent, welcomeService: WelcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        WelcomeComponent,
        { provide: WelcomeService, useValue: welcomeServiceStub }
      ]
    });
    // inject both the component and the dependent service.
    component = TestBed.get(WelcomeComponent);
    welcomeService = TestBed.get(WelcomeService);
  });

  it('should not have welcome message after construction', () => {
    expect(component.content).toBeUndefined();
  });

  it('should welcome logged in user after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.content).toContain(welcomeService.user.name);
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    welcomeService.isLoggedIn = false;
    component.ngOnInit();
    expect(component.content).not.toContain(welcomeService.user.name);
    expect(component.content).toContain('log in');
  });
});
