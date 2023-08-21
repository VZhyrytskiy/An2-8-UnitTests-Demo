import { Injectable } from '@angular/core';

@Injectable()
export class UserListService {

  getUsers(): any[] {
    return ['Anna', 'Boris'];
  }

}
