import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socketService/socket-service.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {


  readonly defaultRoom = 'general';
  constructor(public socketService: SocketService) {
  }

  public sendMessage(newInput: string) {
    if (newInput) {
      // this.messageService.add(newInput);
      console.log('sending message');
      this.socketService.sendEvent('SendMessageToRoom', ({
        'roomName': this.defaultRoom,
        'message': newInput
      }));

    }
  }

  ngOnInit() {
    console.log('automatically joining room general');
    this.socketService.sendEvent('JoinRoom', {
      'roomName': this.defaultRoom
    });
  }

}
