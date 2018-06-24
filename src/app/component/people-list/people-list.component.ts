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
  userList: User[];
  voiceList: Map<String, User>;
  opList: Map<String, User>;

  constructor(private socketService: SocketService, private userService: UserServiceService) {
    // this.rooms = userService.roomMap.keys();
  }

  ngOnInit() {
    this.getPeople();
    console.log('people-list subscribing to socket events');
    this.subscribeToSocketEvents();
  }

  getPeople(): void {
    // todo: apply voice/op changes to the people-list persons?
    this.userService.activeRoomChanges.subscribe(room => {
      this.activeRoom = room;
      // todo unsubscribe from the previous activeRoom subscriptions (HOW?!)
      this.userService.roomMap.get(room).userListChanges.subscribe(userList => {
        this.userList = userList;
        console.log('people-list got ' + userList.length + ' users:',userList);
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
      console.log('people list got event:',message);
      const obj: BackendResponse = JSON.parse(message);
      if (obj.type !== 'RoomJoined') {
        return;
      }
      console.log('in people-list; got RoomJoined message');

      console.log('msg data', obj);
      let tempUserList = this.userService.roomMap.get(obj.value.roomName).userList;
      const newUserEmail = obj.value.email;
      const newUserUsername = obj.value.name;
      let userIncludedInUserList = false;
      for (let user of tempUserList) {
        if (user.email === newUserEmail) {
          userIncludedInUserList = true;
        }
      }
      if (! userIncludedInUserList) {
        const newUser = new User(newUserEmail, newUserUsername);
        tempUserList.push(newUser);
        console.log('changing userList from ',this.userService.roomMap.get(obj.value.roomName).userList,' to ',tempUserList);
        this.userService.roomMap.get(obj.value.roomName).userList = tempUserList;
      } else {
        console.log('the user ' + newUserEmail + ' is already in this userList:',tempUserList);
      }
    });
    // RoomLeft: remove the person from the respective room's userList, if he's there
    /*
    this.socketService.receiveEvents('RoomLeft').subscribe((message: MessageEvent) => {
      console.log('in people-list; got RoomLeft message');
      const obj: BackendResponse = JSON.parse(message.data);
      console.log('msg data', obj);
      let tempUserList = this.userService.roomMap.get(obj.value.roomName).userList;
      const newUserEmail = obj.value.email;
      for (let searchIndex = 0; searchIndex < tempUserList.length; searchIndex ++) {
        if (tempUserList[searchIndex].email === newUserEmail) {
         tempUserList.splice(searchIndex, 1);
         break;
        }
      }
      this.userService.roomMap.get(obj.value.roomName).userList = tempUserList;
    });
    */
  }
}
