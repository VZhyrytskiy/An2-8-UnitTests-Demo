import { Component, OnInit } from '@angular/core';

import { Welcome1Service } from './welcome1.service';

@Component({
  selector: 'app-welcome1',
  templateUrl: './welcome1.component.html',
  styleUrls: ['./welcome1.component.css']
})
export class Welcome1Component implements OnInit {
  content!: string;

  constructor(private welcomeService: Welcome1Service) {}

  ngOnInit() {
    this.content = this.welcomeService.isLoggedIn
      ? `Welcome ${this.welcomeService.user.name}`
      : 'Please log in';
  }
}
