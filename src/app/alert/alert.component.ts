import { Component, OnInit } from '@angular/core';
import {BackendResponse} from '../model/BackendResponse';
import {SocketService} from '../services/socketService/socket-service.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alertType: String;
  showAlert: Boolean;
  alertMessage: String;

  constructor(private socketService: SocketService) {
    this.alertType = 'danger';
    this.showAlert = false;
    this.alertMessage = 'This is a example message for our alert';
  }

  ngOnInit() {
    this.alertType = 'success';
    this.showAlert = true;
    this.alertMessage = 'You joined room "general"';
  }

  private subscribeToSocketEvents(): void {
    // RoomJoined: add the new person to the respective room's userList, if he's not already there
    this.socketService.messageListener.subscribe((message: string) => {
      const obj: BackendResponse = JSON.parse(message);
      switch (obj.type) {
        case 'RoomJoined':
          this.alertMessage = obj.value.email + ' joined Room: ' + obj.value.roomName;
          this.alertType = 'success';
          this.showAlert = true;
          break;
        case 'RoomLeft':
        this.alertMessage = obj.value.email + ' left Room: ' + obj.value.roomName;
        this.alertType = 'warning';
        this.showAlert = true;
          break;
        case 'OpGranted':
          if (obj.value.op) {
            this.alertMessage = obj.value.email + ' was given OP';
            this.alertType = 'success';
           this.showAlert = true;
          } else {
            this.alertMessage = obj.value.email + 'was revoked OP';
            this.alertType = 'danger';
            this.showAlert = true;
          }
          break;
        case 'VoiceGranted':
          if (obj.value.voice) {
            this.alertMessage = obj.value.email + ' was given Voice';
            this.alertType = 'success';
           this.showAlert = true;
          } else {
            this.alertMessage = obj.value.email + 'was revoked Voice';
            this.alertType = 'danger';
            this.showAlert = true;
          }
          break;
        default:
          return;
      }
    });
  }
}
