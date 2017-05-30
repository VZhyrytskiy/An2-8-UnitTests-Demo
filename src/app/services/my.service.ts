import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';


@Injectable()
export class MyService {
  protected value = 'real value';

  getValue() {
    return this.value;
  }

  getAsyncValue() {
    return Promise.resolve('async value');
  }

  getObservableValue() {
    return Observable.of('observable value');
  }

  getTimeoutValue() {
    return new Promise((resolve) => {
      setTimeout(() => { resolve('timeout value'); }, 10);
    });
  }

  getObservableDelayValue() {
    return Observable.of('observable delay value').delay(10);
  }
}


