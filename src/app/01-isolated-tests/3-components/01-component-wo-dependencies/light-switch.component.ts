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

  onClick(): void {
    this.isOn = !this.isOn;
  }

  get message(): string {
    return `The light is ${this.isOn ? 'On' : 'Off'}`;
  }
}
