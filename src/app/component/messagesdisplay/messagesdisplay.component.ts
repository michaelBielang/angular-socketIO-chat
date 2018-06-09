import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/messageService/message.service';
import {SocketService} from '../../services/socketService/socket-service.service';
import {Message} from '../../model/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messagesdisplay.component.html',
  styleUrls: ['./messagesdisplay.component.css']
})
export class MessagesDisplayComponent implements OnInit {

  messages: Message[];

  constructor(public messageService: MessageService,
              private socketService: SocketService,
  ) {
    this.messages = this.messageService.getMessages();
    this.socketService.receiveEvents('MessageSendToRoom').subscribe((message: MessageEvent) => {
      const obj: BackendResponse = JSON.parse(message.data);
      this.messages.push(new Message(obj.value.message, obj.value.email, new Date()));
    });
  }

  getMessages(): void {
  }


  ngOnInit() {
    this.getMessages();
  }

}
