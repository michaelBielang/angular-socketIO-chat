import { Component, OnInit } from '@angular/core';
import {ActionService} from '../../services/actionService/action.service';
import {UserServiceService} from "../../services/userService/user-service.service";

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.css']
})
export class RoomSettingsComponent implements OnInit {
  public requireVoice = true;
  public requireInvite = false;

  constructor(public actionService: ActionService, public userService: UserServiceService) { }

  ngOnInit() {
  }

}
