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

  rooms: IterableIterator<String>;

  constructor(private socketService: SocketService, private userService: UserServiceService) {
    this.rooms = userService.roomMap.keys();
  }
  ngOnInit() {
  }

  joinRoom(room: string): void {
    this.userService.joinRoom(room);
  }
}
