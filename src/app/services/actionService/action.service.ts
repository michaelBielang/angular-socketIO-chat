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
  public setRoomInviteRequired(roomName: string, inviteRequired: boolean) {
    this.socketService.sendEvent('SetInviteRoom', {
      roomName: roomName,
      inviteRequired: true
    });
  }
  public setRoomInviteNormal(roomName: string, inviteRequired: boolean) {
    this.socketService.sendEvent('SetInviteRoom', {
      roomName: roomName,
      inviteRequired: false
    });
  }
  public setRoomVoiceRequired(roomName: string, voiceRequired: boolean) {
    this.socketService.sendEvent('SetVoiceRoom', {
      roomName: roomName,
      voice: true
    });
  }
  public setRoomVoiceNormal(roomName: string, voiceRequired: boolean) {
    this.socketService.sendEvent('SetVoiceRoom', {
      roomName: roomName,
      voice: false
    });
  }

}
