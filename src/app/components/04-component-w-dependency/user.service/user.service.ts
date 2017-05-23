import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  isLoggedIn = false;
  user = {
    name: 'Vitaliy'
  };
}
