import { Injectable } from '@angular/core';
import {SocketService} from '../socketService/socket-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private socketService: SocketService) {
  }
  public kick(email: string, roomName: string) {
    this.socketService.sendEvent('InviteToRoom', {
      roomName: roomName,
      email: email,
      invite: false
    });
  }
  public invite(email: string, roomName: string) {
    this.socketService.sendEvent('InviteToRoom', {
      roomName: roomName,
      email: email,
      invite: true
    });
  }
  public grantOp(email: string, roomName: string) {
    this.socketService.sendEvent('GrantOp', {
      roomName: roomName,
      email: email,
      op: true
    });
  }
  public removeOp(email: string, roomName: string) {
    this.socketService.sendEvent('GrantOp', {
      roomName: roomName,
      email: email,
      op: false
    });
  }
  public grantVoice(email: string, roomName: string) {
    this.socketService.sendEvent('GrantVoice', {
      roomName: roomName,
      email: email,
      voice: true
    });
  }
  public removeVoice(email: string, roomName: string) {
    this.socketService.sendEvent('GrantVoice', {
      roomName: roomName,
      email: email,
      voice: false
    });
  }
  public setRoomInviteSetting(roomName: string, inviteRequired: boolean) {
    this.socketService.sendEvent('SetInviteRoom', {
      roomName: roomName,
      inviteRequired: inviteRequired
    });
  }
  public setRoomVoiceSetting(roomName: string, voiceRequired: boolean) {
    this.socketService.sendEvent('SetVoiceRoom', {
      roomName: roomName,
      voice: voiceRequired
    });
  }

}
