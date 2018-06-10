import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socketService/socket-service.service';
import {Message} from '../../model/Message';
import {MessageSet} from "../../model/MessageSet";

@Component({
  selector: 'messages-display',
  templateUrl: './messagesdisplay.component.html',
  styleUrls: ['./messagesdisplay.component.css']
})
export class MessagesDisplayComponent implements OnInit {

  messageSets: MessageSet[];
  lastauthor: string;

  constructor(private socketService: SocketService,
  ) {

    // add messages one by one, creating a new MessageSet for each new author
    this.lastauthor = 'nobody';
    this.messageSets = [];
    this.socketService.receiveEvents('MessageSendToRoom').subscribe((message: MessageEvent) => {
      const obj: BackendResponse = JSON.parse(message.data);
      this.add(new Message(obj.value.message, obj.value.email, new Date()));
    });
  }
  add(msg: Message) {
    // if author matches, just add the msg to the last MessageSet
    if (msg.author === this.lastauthor && this.messageSets.length > 0) {
      this.messageSets[this.messageSets.length - 1].add(msg);
      // else, create a new temp MessageSet using the msg
    } else {
      // push the temp MessageSet to the MessagesDisplayComponent's messageSets
      this.lastauthor = msg.author;
      this.messageSets.push(new MessageSet([msg]));
    }
  }


  ngOnInit() {
    console.log('messagedisplay oninit');
    // this.getMessages();
  }

}
