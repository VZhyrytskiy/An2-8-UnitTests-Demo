import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Welcome1Service {
  isLoggedIn = false;
  user = {
    name: 'Vitaliy'
  };
}
