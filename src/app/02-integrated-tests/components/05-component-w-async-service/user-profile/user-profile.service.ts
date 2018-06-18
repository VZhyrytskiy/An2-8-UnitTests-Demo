import { Injectable } from '@angular/core';

const userData = {
  firstName: 'Vitaliy',
  lastName: 'Zhyrytskyy'
};


@Injectable()
export class UserProfileService {

  getUser(): Promise<any> {
    return Promise.resolve(userData);
  }

}
