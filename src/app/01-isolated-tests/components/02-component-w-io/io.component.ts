import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IO {
  id: number;
  value: string;
}

@Component({
  selector: 'app-io',
  templateUrl: './io.component.html'
})
export class IoComponent {
  @Input() data: IO;
  @Output() pass = new EventEmitter<IO>();

  onClick(): void {
    this.pass.emit(this.data);
  }
}
