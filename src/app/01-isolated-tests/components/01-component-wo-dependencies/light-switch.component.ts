import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-light-switch',
  template: `
    <button (click)="onClick()">Click me!</button>
    <span>{{ message }}</span>
  `
})
export class LightSwitchComponent {
  isOn = false;

  onClick() {
    this.isOn = !this.isOn;
  }

  get message() {
    return `The light is ${this.isOn ? 'On' : 'Off'}`;
  }
}
