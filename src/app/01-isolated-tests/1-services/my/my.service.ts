import { Injectable } from '@angular/core';

import { Observable, of, delay } from 'rxjs';

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
    return of('observable value');
  }

  getTimeoutValue(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('timeout value');
      }, 1000);
    });
  }

  getObservableDelayValue(): Observable<string> {
    return of('observable delay value').pipe(delay(10));
  }
}
