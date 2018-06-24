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
  }

  showRoom(room: string): void {
    this.userService.showRoom(room);
  }
}
