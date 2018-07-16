import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../services/userService/user-service.service';
import {MessageSet} from '../../model/MessageSet';
import {Subscription} from 'rxjs/index';

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
    this.messageSubscription = this.userService.roomMap.get(this.userService.activeRoom).messageSetsChanges.subscribe(
      (next) => {
        this.messageSets = next;
      }
    );
    this.userService.activeRoomChanges.subscribe(
      (next) => {
        this.messageSubscription.unsubscribe();
        // get the new messageSet when the room changes
        this.messageSubscription = this.userService.roomMap.get(this.userService.activeRoom).messageSetsChanges.subscribe(
          (next) => {
            this.messageSets = next;
          }
        );
      }
    );
  }

  // todo subscribe to activeRoom; always update the messages-display to match

}
