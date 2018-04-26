import { Component, OnInit } from '@angular/core';

import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  content: string;

  constructor(private welcomeService: WelcomeService) {}

  ngOnInit() {
    this.content = this.welcomeService.isLoggedIn
      ? `Welcome ${this.welcomeService.user.name}`
      : 'Please log in';
  }
}
