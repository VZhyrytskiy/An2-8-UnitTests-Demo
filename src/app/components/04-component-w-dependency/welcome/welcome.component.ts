import { Component, OnInit } from '@angular/core';

import { UserService } from 'app/components';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcome = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.welcome = this.userService.isLoggedIn
      ? `Welcome ${this.userService.user.name}`
      : 'Pleae log in';
  }

}
