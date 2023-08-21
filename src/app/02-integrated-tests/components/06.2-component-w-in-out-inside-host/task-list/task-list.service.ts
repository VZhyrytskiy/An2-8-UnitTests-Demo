import { Injectable } from '@angular/core';

@Injectable()
export class TaskListService {

  getTasks(): any[] {
    return ['Create', 'Update', 'Delete'];
  }

}
