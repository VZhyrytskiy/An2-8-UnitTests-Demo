import { Injectable } from '@angular/core';

@Injectable()
export class UserProfileService {

  getUser(): Promise<any> {
    return Promise.resolve({
      firstName: 'Vitaliy',
      lastName: 'Zhyrytskyy'
    });
  }

}
