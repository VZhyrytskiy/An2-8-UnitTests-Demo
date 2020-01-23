import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

const userProfile = 'Vitaliy Zhyrytskyy';

@Injectable()
export class UserProfileService {

  getUserAsPromise(): Promise<string> {
    return Promise.resolve(userProfile);
  }

  getUserAsObservable(): Observable<string> {
    return of(userProfile);
  }
}
