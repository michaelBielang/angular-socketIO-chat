import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socketService/socket-service.service';
import {UserServiceService} from '../../services/userService/user-service.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {


  readonly defaultRoom = 'general';

  constructor(public socketService: SocketService, public userService: UserServiceService) {
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

  public interceptInviteCommand(userInput: string) {
    const regeg = '/invite ';

    // TODO check if invite rights
    // user tries to invite another user
    if (userInput.search(regeg) !== -1) {
      const splittedUserInput = userInput.split(' ');
      const invitedUserEmail = splittedUserInput[1];
      const relevantRoom = splittedUserInput[2];

      this.userService.roomMap.get(relevantRoom).hasOP(relevantRoom);

      if (invitedUserEmail.search(' ') !== -1 && invitedUserEmail.search('@') === -1) {
        const userInputInTemplateForm = {
          roomName: relevantRoom,
          email: invitedUserEmail,
          invite: true
        };

        // TODO retreive relevant Event and handle AlertService
        this.socketService.receiveEvents('UserRegistered').subscribe((message: MessageEvent) => {
          console.log('message: ' + message.data);
        });

        this.socketService.sendEvent('InviteToRoom', userInputInTemplateForm);
      }
    }
  }

  ngOnInit() {
    console.log('automatically joining room general');
    this.socketService.sendEvent('JoinRoom', {
      'roomName': this.defaultRoom
    });
  }

}
