import { Injectable } from '@angular/core';

import { Observable, of as ObservableOf } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  protected value = 'real value';

  getValue(): string {
    return this.value;
  }

  getPromiseValue(): Promise<string> {
    return Promise.resolve('promise value');
  }

  getObservableValue(): Observable<string> {
    return ObservableOf('observable value');
  }

  getTimeoutValue(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('timeout value');
      }, 1000);
    });
  }

  getObservableDelayValue(): Observable<string> {
    return ObservableOf('observable delay value').pipe(delay(10));
  }
}
