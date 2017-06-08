import { Injectable } from '@angular/core';

@Injectable()
export class WelcomeService {
  isLoggedIn = false;
  user = {
    name: 'Vitaliy'
  };
}
