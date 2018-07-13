import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socketService/socket-service.service";
import {BackendResponse} from "../../model/BackendResponse";
import {Message} from "../../model/Message";
import {UserServiceService} from "../../services/userService/user-service.service";
import {AlertService} from "../../services/alertService/alert-service.service";

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit {

  constructor(private socketService: SocketService, private userService: UserServiceService, private alertService: AlertService) {
    userService.interceptIncomingCommands();
    alertService.injectUserService(userService);
  }

  ngOnInit() {
    this.userService.joinRoom('Angst vor Vorträgen');
    this.userService.joinRoom('Vorführeffekt Fails');
    this.userService.joinRoom('general');
    this.userService.activeRoom = 'general';

    this.socketService.messageListener.subscribe((event: string) => {
      const obj: BackendResponse = JSON.parse(event);
      if (obj.type === 'MessageSendToRoom') {
        // add the new message to the respective room
        this.userService.roomMap.get(obj.value.roomName).addMessage(
          // the message including message text, email and datetime of arrival
          new Message(obj.value.message, obj.value.email, new Date()),
          // boolean of whether or not the message is actively being read
          obj.value.roomName === this.userService.activeRoom);
      }
    });
  }
}
