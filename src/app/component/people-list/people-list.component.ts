import { Component, OnInit } from '@angular/core';
import {Rooms} from '../../model/Rooms';
import {SocketService} from '../../services/socketService/socket-service.service';
import {UserServiceService} from '../../services/userService/user-service.service';
import {User} from '../../model/User';
import {BackendResponse} from '../../model/BackendResponse';
import {Message} from '../../model/Message';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  activeRoom: string;
  userList: Set<string>;
  voiceList: Set<string>;
  opList: Set<string>;

  constructor(private socketService: SocketService, private userService: UserServiceService) {
    // this.rooms = userService.roomMap.keys();
  }

  ngOnInit() {
    this.getPeople();
    this.subscribeToSocketEvents();
  }

  getPeople(): void {
    // todo: apply voice/op changes to the people-list persons?
    this.userService.activeRoomChanges.subscribe(room => {
      this.activeRoom = room;
      // todo unsubscribe from the previous activeRoom subscriptions (HOW?!)
      this.userService.roomMap.get(room).userListChanges.subscribe(userList => {
        this.userList = userList;
      });
      this.userService.roomMap.get(room).VoiceListChanges.subscribe(voiceList => {
        this.voiceList = voiceList;
      });
      this.userService.roomMap.get(room).OPListChanges.subscribe(opList => {
        this.opList = opList;
      });
    });
  }

  private subscribeToSocketEvents(): void {
    // RoomJoined: add the new person to the respective room's userList, if he's not already there
    this.socketService.messageListener.subscribe((message: string) => {
      const obj: BackendResponse = JSON.parse(message);
      switch (obj.type) {
        case 'RoomJoined':
          this.addPersonToList(obj.value.roomName, 'userList', obj.value.email, obj.value.name);
          break;
        case 'RoomLeft':
          this.removePersonFromList(obj.value.roomName, 'userList', obj.value.email);
          break;
        case 'OpGranted':
          if (obj.value.op) {
            this.addPersonToList(obj.value.roomName, 'OPList', obj.value.email);
          } else {
            this.removePersonFromList(obj.value.roomName, 'OPList', obj.value.email);
          }
          break;
        case 'VoiceGranted':
          if (obj.value.voice) {
            this.addPersonToList(obj.value.roomName, 'VoiceList', obj.value.email);
          } else {
            this.removePersonFromList(obj.value.roomName, 'VoiceList', obj.value.email);
          }
          break;
        default:
          return;
      }
    });
  }

    addPersonToList(roomName: string, listName: string, email: string, username= 'unknown') {
      this.userService.roomMap.get(roomName)[listName].add(email);
    }
    removePersonFromList(roomName: string, listName: string, email: string) {
      this.userService.roomMap.get(roomName)[listName].delete(email);
    }
}
