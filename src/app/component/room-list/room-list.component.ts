import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socketService/socket-service.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  private rooms: string[];

  constructor() {

   }

  ngOnInit() {
  }

}
