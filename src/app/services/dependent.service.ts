import { Injectable } from '@angular/core';
import { MyService } from './my.service';

@Injectable()
export class DependentService {
  constructor(
    private myService: MyService
  ) { }

  getValue() {
    return this.myService.getValue();
  }
}
