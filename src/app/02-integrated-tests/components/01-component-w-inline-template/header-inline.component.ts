import { Component } from '@angular/core';

@Component({
  selector: 'app-header-inline',
  template: `<h1>{{title}}</h1>`,
  styles: ['h1 { color: #8b0000; } ']
})
export class HeaderInlineComponent {
  title = 'Header Inline Component Title';
}
