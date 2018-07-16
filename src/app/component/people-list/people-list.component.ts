<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Rooms } from '../../model/Rooms';
import { SocketService } from '../../services/socketService/socket-service.service';
import { UserServiceService } from '../../services/userService/user-service.service';
import { User } from '../../model/User';
import { BackendResponse } from '../../model/BackendResponse';
import { Message } from '../../model/Message';
import { ActionService } from '../../services/actionService/action.service';
import {Router} from '@angular/router';
=======
import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socketService/socket-service.service';
import {UserServiceService} from '../../services/userService/user-service.service';
import {BackendResponse} from '../../model/BackendResponse';
import {ActionService} from '../../services/actionService/action.service';
>>>>>>> 9f4fae5aa031547af8397c5a5e4ce99b9d53dba0

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
  currentUser: string;

<<<<<<< HEAD
  constructor(
    private router: Router,
    private socketService: SocketService,
    private userService: UserServiceService,
    private actionService: ActionService
  ) {
=======
  constructor(private socketService: SocketService, private userService: UserServiceService) {
>>>>>>> 9f4fae5aa031547af8397c5a5e4ce99b9d53dba0
    this.currentUser = this.userService.currentUser.email + '';
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
      this.userService.roomMap
        .get(room)
        .VoiceListChanges.subscribe(voiceList => {
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
<<<<<<< HEAD
          this.addPersonToList(
            obj.value.roomName,
            'userList',
            obj.value.email,
            obj.value.name
          );
=======
          this.addPersonToList(obj.value.roomName, 'userList', obj.value.email);
>>>>>>> 9f4fae5aa031547af8397c5a5e4ce99b9d53dba0
          break;
        case 'RoomLeft':
          this.removePersonFromList(
            obj.value.roomName,
            'userList',
            obj.value.email
          );
          break;
        case 'OpGranted':
          if (obj.value.op) {
            this.addPersonToList(obj.value.roomName, 'OPList', obj.value.email);
          } else {
            this.removePersonFromList(
              obj.value.roomName,
              'OPList',
              obj.value.email
            );
          }
          break;
        case 'VoiceGranted':
          if (obj.value.voice) {
            this.addPersonToList(
              obj.value.roomName,
              'VoiceList',
              obj.value.email
            );
          } else {
            this.removePersonFromList(
              obj.value.roomName,
              'VoiceList',
              obj.value.email
            );
          }
          break;
        default:
          return;
      }
    });
  }

  // only use this method to process server events, not to change permissions
<<<<<<< HEAD
  addPersonToList(
    roomName: string,
    listName: string,
    email: string,
    username = 'unknown'
  ) {
=======
  addPersonToList(roomName: string, listName: string, email: string) {
>>>>>>> 9f4fae5aa031547af8397c5a5e4ce99b9d53dba0
    this.userService.roomMap.get(roomName)[listName].add(email);
  }

  // only use this method to process server events, not to change permissions
  removePersonFromList(roomName: string, listName: string, email: string) {
    this.userService.roomMap.get(roomName)[listName].delete(email);
  }

  invitableRooms(userEmail: string): string[] {
    const knownRoomsWithoutUser = [];
<<<<<<< HEAD
    this.userService.roomMap.forEach(function(roomObj, roomName) {
=======
    this.userService.roomMap.forEach(function (roomObj, roomName) {
>>>>>>> 9f4fae5aa031547af8397c5a5e4ce99b9d53dba0
      if (!roomObj.userList.has(userEmail)) {
        knownRoomsWithoutUser.push(roomName);
      }
    });
    return knownRoomsWithoutUser;
  }
  onSubmit() {
    const userInputInTemplateForm = {};
    this.socketService.sendEvent('Logout', userInputInTemplateForm);
    this.socketService.disconnect();
    this.router.navigate(['/login']);
  }
  toSettings() {
    this.router.navigate(['/settings']);
  }
}
