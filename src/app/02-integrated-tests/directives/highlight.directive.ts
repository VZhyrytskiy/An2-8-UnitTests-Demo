import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges {

  defaultColor = 'rgb(211, 211, 211)';  // lightgray

  // tslint:disable-next-line:no-input-rename
  @Input('highlight') bgColor!: string;

  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true; // some custom value
  }

  ngOnChanges(): void {
    this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
