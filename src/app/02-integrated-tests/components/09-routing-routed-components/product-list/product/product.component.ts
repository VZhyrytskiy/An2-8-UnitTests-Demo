import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{
  @Input() product: any;
  @Output() selected = new EventEmitter<any>();

  onClick(): void {
    this.selected.emit(this.product);
  }
}
