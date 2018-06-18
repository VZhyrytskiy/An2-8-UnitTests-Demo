import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: string;
  @Output() selected = new EventEmitter<string>();

  onClick() {
    this.selected.emit(this.user);
  }
}
