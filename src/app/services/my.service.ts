import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of as ObservableOf } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

@Injectable()
export class MyService {
  protected value = 'real value';

  getValue() {
    return this.value;
  }

  getPromiseValue() {
    return Promise.resolve('promise value');
  }

  getObservableValue() {
    return ObservableOf('observable value');
  }

  getTimeoutValue() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('timeout value');
      }, 1000);
    });
  }

  getObservableDelayValue() {
    return ObservableOf('observable delay value').pipe(delay(10));
  }
}
