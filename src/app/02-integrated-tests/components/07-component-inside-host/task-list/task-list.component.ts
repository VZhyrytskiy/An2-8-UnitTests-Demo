import { Component, OnInit } from '@angular/core';

import { TaskListService } from './task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: string[];

  constructor(
    private taskListService: TaskListService
  ) { }

  ngOnInit(): void {
    this.tasks = this.taskListService.getTasks();
  }

  showDetails(task: string): void {
    console.log(task);
  }

}
