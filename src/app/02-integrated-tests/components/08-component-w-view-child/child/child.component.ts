import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `Timestamp: {{timeStamp}}`
})
export class ChildComponent implements OnInit {

  public timeStamp: Date;

  ngOnInit(): void {
    this.updateTimeStamp();
  }

  updateTimeStamp(): void {
    this.timeStamp = new Date();
  }

}
