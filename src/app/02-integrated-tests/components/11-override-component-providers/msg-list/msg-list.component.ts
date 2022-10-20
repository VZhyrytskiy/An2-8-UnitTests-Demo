import { Component, OnInit } from '@angular/core';
import { MsgListService } from './msg-list.service';

@Component({
  selector: 'app-msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.css'],
  providers: [MsgListService]
})
export class MsgListComponent implements OnInit {
  messages!: any[];

  constructor(
    private msgListService: MsgListService
  ) { }

  ngOnInit(): void {
    this.messages = this.msgListService.getMessges();
  }

}
