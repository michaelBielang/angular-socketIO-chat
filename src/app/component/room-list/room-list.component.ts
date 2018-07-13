import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socketService/socket-service.service';
import { UserServiceService } from '../../services/userService/user-service.service';
import {Rooms} from '../../model/Rooms';
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  activeRoom: string;
  rooms: Map<String, Rooms>;
  roomList: any[];

  constructor(private socketService: SocketService, private userService: UserServiceService) {
    // this.rooms = userService.roomMap.keys();
  }

  ngOnInit() {
    this.getRooms();
  }

  getRooms(): void {
    this.userService.roomMapChanges.subscribe(rooms => {
      this.rooms = rooms;
      this.roomList = Array.from(this.rooms.keys());
    });
    this.userService.activeRoomChanges.subscribe(room => {
      this.activeRoom = room;
    });
  }

  joinRoom(room): void {
    if (room.length < 1) {
      console.log('Cannot join the room with no name!');
      return;
    }
    this.userService.joinRoom(room);
  }

  showRoom(room: string): void {
    this.userService.showRoom(room);
  }
}
