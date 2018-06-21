import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../services/userService/user-service.service';
import {SocketService} from '../../services/socketService/socket-service.service';
import {Message} from '../../model/Message';
import {MessageSet} from '../../model/MessageSet';
import {BackendResponse} from '../../model/BackendResponse';

@Component({
  selector: 'app-messages-display',
  templateUrl: './messagesdisplay.component.html',
  styleUrls: ['./messagesdisplay.component.css']
})
export class MessagesDisplayComponent implements OnInit {

  constructor(private userService: UserServiceService) {

  }

  ngOnInit() {
    console.log('messagedisplay oninit');
    // this.getMessages();
    console.log('activeRoom:', this.userService.activeRoom);
    console.log('roomMap:', this.userService.roomMap);
    this.userService.roomMap.get(this.userService.activeRoom).messageSetsChanges.subscribe(
      (next) => console.log('new msgSet:', next)
    );
  }

}
