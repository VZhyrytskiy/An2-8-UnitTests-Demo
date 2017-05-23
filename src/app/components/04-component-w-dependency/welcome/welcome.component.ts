import { Component, OnInit } from '@angular/core';

import { UserService } from './../user.service/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  content = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.content = this.userService.isLoggedIn
      ? `Welcome ${this.userService.user.name}`
      : 'Please log in';
  }

}
