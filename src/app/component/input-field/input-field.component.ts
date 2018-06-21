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
    if (newInput && !this.userInvited(newInput)) {
      // this.messageService.add(newInput);
      console.log('sending message');
      this.socketService.sendEvent('SendMessageToRoom', ({
        'roomName': this.defaultRoom,
        'message': newInput
      }));
      // add the message to the userService's roomMap's MessageSet via SOME addMessage function??
      // this.userService.roomMap.get(this.userService.activeRoom).
    }
  }

  public userInvited(userInput: string): boolean {
    const regeg = '/invite ';

    // TODO check if invite rights
    // user tries to invite another user
    if (userInput.search(regeg) !== -1) {

      const splittedUserInput = userInput.split(' ');
      const invitedUserEmail = splittedUserInput[1];
      const relevantRoom: string = splittedUserInput[2];
      console.log("invite received");

      // TODO Frage: Server schluckt ungültige Kommandos einfach?
      //this.userService.roomMap.get(relevantRoom).hasOP(relevantRoom);
      if(!relevantRoom ){
        alert("Syntax Error. Use:    /invite email room");
        return true;
      }
      if (invitedUserEmail.search('@') !== -1 && relevantRoom.length > 0) {
        const userInputInTemplateForm = {
          roomName: relevantRoom,
          email: invitedUserEmail,
          invite: true
        };

        console.log("invited user: " + invitedUserEmail + " room: " + relevantRoom);

        // TODO retreive relevant Event and handle AlertService
        this.socketService.receiveEventString().subscribe((message: MessageEvent) => {
          console.log('message: ' + message.data);
        });

        this.socketService.sendEvent('InviteToRoom', userInputInTemplateForm);
        return true;
      }
      else {
        alert("Syntax Error. Use:    /invite email room");
      }
    }
    return false;
  }

  ngOnInit() {

  }

}
