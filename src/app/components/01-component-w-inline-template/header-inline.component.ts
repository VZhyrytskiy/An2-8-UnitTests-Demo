import { Component } from '@angular/core';

@Component({
  selector: 'app-header-inline',
  template: `<h1>{{title}}</h1>`
})
export class HeaderInlineComponent {
  title = 'Header Inline Component';
}
