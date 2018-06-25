import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../services/userService/user-service.service';
import {SocketService} from '../../services/socketService/socket-service.service';
import {Message} from '../../model/Message';
import {MessageSet} from '../../model/MessageSet';
import {BackendResponse} from '../../model/BackendResponse';
import {Subscription} from 'rxjs/index';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-messages-display',
  templateUrl: './messagesdisplay.component.html',
  styleUrls: ['./messagesdisplay.component.css']
})
export class MessagesDisplayComponent implements OnInit {

  private messageSets: MessageSet[];
  private messageSubscription: Subscription;

  constructor(private userService: UserServiceService, private socketService: SocketService, public sanitizer: DomSanitizer) {

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
        if (typeof this.messageSets !== 'undefined' && this.messageSets.length > 0) {
          let lastMessage = (this.messageSets[this.messageSets.length-1].messages[(this.messageSets[this.messageSets.length-1].messages.length-1)]);
          console.log('last message:', lastMessage);
          if (lastMessage.text.startsWith('!giphy')) {
            console.log('hmmmmmmmmmmmmmmmmmmm!');
          }
        }
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
