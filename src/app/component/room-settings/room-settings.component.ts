import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.css']
})
export class RoomSettingsComponent implements OnInit {
  public requireVoice = true;
  public requireInvite = false;

  constructor() { }

  showIt(value) {
    console.log('showIt called');
    console.log(value);
  }

  ngOnInit() {
  }

}
