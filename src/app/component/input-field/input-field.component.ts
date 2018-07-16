import {Component, OnInit} from '@angular/core';
import {ActionService} from '../../services/actionService/action.service';
import {SocketService} from "../../services/socketService/socket-service.service";
import {UserServiceService} from "../../services/userService/user-service.service";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  constructor(private actionService: ActionService, private socketService: SocketService, private userService: UserServiceService) {
  }

  public sendMessage(newInput: string) {
    // TODO auf Feedback vom Heidegger warten
    if (newInput && !this.shellCommand(newInput)) {
      this.socketService.sendEvent('SendMessageToRoom', ({
        'roomName': this.userService.activeRoom,
        'message': newInput
      }));
    }
  }

  /**
   * TODO implement interception of wrong input
   * @param {string} userInput
   * @returns {boolean}
   */
  public shellCommand(userInput: string): boolean {
    if (userInput.search('/invite ') !== -1) {
      return this.createMessage(userInput, 'invite');
    } else if (userInput.search('/kick ') !== -1) {
      return this.createMessage(userInput, 'kick');
    } else if (userInput.search('/giveop ') !== -1) {
      return this.createMessage(userInput, 'giveop');
    } else if (userInput.search('/removeop ') !== -1) {
      return this.createMessage(userInput, 'removeop');
    } else if (userInput.search('/givevoice ') !== -1) {
      return this.createMessage(userInput, 'givevoice');
    } else if (userInput.search('/removevoice ') !== -1) {
      return this.createMessage(userInput, 'removevoice');
    }
    return false;
  }

  private createMessage(userInput: string, command: string): boolean {
    const splittedUserInput = userInput.split(' ');
    const invitedUserEmail = splittedUserInput[1];
    const relevantRoom: string = splittedUserInput[2];

    if (command === 'invite') {
      this.actionService.invite(invitedUserEmail, relevantRoom);
    } else if (command === 'kick') {
      this.actionService.kick(invitedUserEmail, relevantRoom);
    } else if (command === 'giveop') {
      this.actionService.grantOp(invitedUserEmail, relevantRoom);
    } else if (command === 'removeop') {
      this.actionService.removeOp(invitedUserEmail, relevantRoom);
    } else if (command === 'givevoice') {
      this.actionService.grantVoice(invitedUserEmail, relevantRoom);
    } else if (command === 'removevoice') {
      this.actionService.removeVoice(invitedUserEmail, relevantRoom);
    }
    return true;
  }
  ngOnInit() {

  }
}

