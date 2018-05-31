import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/messageService/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: String[];

  constructor(public messageService: MessageService) {
    this.messages = this.messageService.getMessages();
  }

  getMessages(): void {
  }

  ngOnInit() {
    this.getMessages();
  }

}
