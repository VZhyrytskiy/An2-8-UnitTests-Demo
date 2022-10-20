import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  userDataPromise!: Promise<string>;
  userDataObservable$!: Observable<string>;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userDataPromise = this.userProfileService.getUserAsPromise();
    this.userDataObservable$ = this.userProfileService.getUserAsObservable();
  }
}
