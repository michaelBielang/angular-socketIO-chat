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
    // TODO auf Feedback vom Heidegger warten
    if (newInput && !this.shellCommand(newInput)) {
      console.log('sending message');
      this.socketService.sendEvent('SendMessageToRoom', ({
        'roomName': this.userService.activeRoom,
        'message': newInput
      }));
    }
  }

  public shellCommand(userInput: string): boolean {
    if (userInput.search('/invite ') !== -1) {
      return this.createMessage(userInput, 'invite');
    } else if (userInput.search('/kick ') !== -1) {
      return this.createMessage(userInput, 'kick');
    }
    else if (userInput.search('/giveop ') !== -1) {
      return this.createMessage(userInput, 'giveop');
    }
    else if (userInput.search('/removeop ') !== -1) {
      return this.createMessage(userInput, 'removeop');
    }
    else if (userInput.search('/givevoice ') !== -1) {
      return this.createMessage(userInput, 'givevoice');
    }
    else if (userInput.search('/removevoice ') !== -1) {
      return this.createMessage(userInput, 'removevoice');
    }
    return false;
  }

  private createMessage(userInput: string, command: string): boolean {
    const splittedUserInput = userInput.split(' ');
    const invitedUserEmail = splittedUserInput[1];
    const relevantRoom: string = splittedUserInput[2];

    if (command === 'invite') {
      this.sendShellCommandToSock('InviteToRoom', this.getInviteKick(relevantRoom, invitedUserEmail, true));
    } else if (command === 'kick') {
      this.sendShellCommandToSock('InviteToRoom', this.getInviteKick(relevantRoom, invitedUserEmail, false));
    } else if (command === 'giveop') {
      this.sendShellCommandToSock('GrantOp', this.getOP(relevantRoom, invitedUserEmail, true));
    } else if (command === 'removeop') {
      this.sendShellCommandToSock('GrantOp', this.getOP(relevantRoom, invitedUserEmail, false));
    } else if (command === 'givevoice') {
      this.sendShellCommandToSock('SetVoiceRoom', this.getVoice(relevantRoom, invitedUserEmail, true));
    } else if (command === 'removevoice') {
      this.sendShellCommandToSock('SetVoiceRoom', this.getVoice(relevantRoom, invitedUserEmail, false));
    }
    return true;
  }

  private getInviteKick(roomname: String, invitedUserEmail: String, invite: boolean): any {
    return {
      roomName: roomname,
      email: invitedUserEmail,
      invite: invite
    };
  }

  private getVoice(roomname: String, invitedUserEmail: String, voice: boolean): any {
    return {
      roomName: roomname,
      email: invitedUserEmail,
      voice: voice
    };
  }

  private getOP(roomname: String, invitedUserEmail: String, op: boolean): any {
    return {
      roomName: roomname,
      email: invitedUserEmail,
      op: op
    };
  }

  private sendShellCommandToSock(command: string, obj: any) {
    console.log('received command: ' + command);
    //TODO frage wie man an den wert von command im Interface rankommt
    console.log('obj: ' + (<ShellInterface>obj).roomName);
    this.socketService.sendEvent(command, obj);
  }

  ngOnInit() {

  }

}
