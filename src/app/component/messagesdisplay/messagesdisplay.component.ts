import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../services/userService/user-service.service';
import {SocketService} from '../../services/socketService/socket-service.service';
import {Message} from '../../model/Message';
import {MessageSet} from '../../model/MessageSet';
import {BackendResponse} from '../../model/BackendResponse';
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-messages-display',
  templateUrl: './messagesdisplay.component.html',
  styleUrls: ['./messagesdisplay.component.css']
})
export class MessagesDisplayComponent implements OnInit {

  private messageSets: MessageSet[];
  private messageSubscription: Subscription;

  constructor(private userService: UserServiceService) {

  }

  ngOnInit() {
    console.log('messagedisplay oninit');
    // this.getMessages();
    console.log('activeRoom:', this.userService.activeRoom);
    console.log('roomMap:', this.userService.roomMap);
    this.messageSubscription = this.userService.roomMap.get(this.userService.activeRoom).messageSetsChanges.subscribe(
      (next) => {
        console.log('messageSets changed due to new messages (probably)', next);
        this.messageSets = next;
      }
    );
    this.userService.activeRoomChanges.subscribe(
      (next) => {
        console.log('active room changed for message display', next);
        this.messageSubscription.unsubscribe();
        // get the new messageSet when the room changes
        this.messageSubscription = this.userService.roomMap.get(this.userService.activeRoom).messageSetsChanges.subscribe(
          (next) => {
            console.log('messageSets changed due to different active Room', next);
            this.messageSets = next;
          }
        );
      }
    );
  }
  // todo subscribe to activeRoom; always update the messages-display to match

}
