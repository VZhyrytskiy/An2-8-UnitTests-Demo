import { Injectable } from '@angular/core';

const messages = [
  { 'id': 1, 'msg': 'Hi, Ann' },
  { 'id': 2, 'msg': 'Hi, Boris' },
  { 'id': 3, 'msg': 'What are doing?' }
];


@Injectable()
export class MsgListService {

  getMessges(): any[] {
    return messages;
  }
}
