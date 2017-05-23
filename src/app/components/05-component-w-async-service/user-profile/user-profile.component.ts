import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './../user-profile.service/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  firstName = '';
  lastName = '';

  constructor(
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
    this.userProfileService.getUser()
      .then(data => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
      });
  }

}
