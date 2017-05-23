import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{
  @Input() task: string;
  @Output() selected = new EventEmitter<string>();

  onClick() {
    this.selected.emit(this.task);
  }
}
