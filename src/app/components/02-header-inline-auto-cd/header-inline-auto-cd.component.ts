import { Component } from '@angular/core';

@Component({
  selector: 'app-header-inline-auto-cd',
  template: `<h1>{{title}}</h1>`,
  styleUrls: ['./header-inline-auto-cd.component.css']
})
export class HeaderInlineAutoCdComponent {
  title = 'Header Inline Component';
}
