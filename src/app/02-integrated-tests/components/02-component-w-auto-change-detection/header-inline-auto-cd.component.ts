import { Component } from '@angular/core';

@Component({
  selector: 'app-header-inline-auto-cd',
  template: `<h1>{{title}}</h1>`,
  styles: ['h1 { color: #8b0000; } ']
})
export class HeaderInlineAutoCdComponent {
  title = 'Header Inline Component';
}
