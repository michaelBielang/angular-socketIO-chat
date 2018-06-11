import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';
import {BackendResponse} from "../../model/BackendResponse";
import {Message} from "../../model/Message";
import {SocketService} from "../socketService/socket-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();
  private activeRoom: string;

  constructor(public socketService: SocketService) {
    // subscribe to messages
    this.socketService.receiveEvents('MessageSendToRoom').subscribe((message: MessageEvent) => {
      const obj: BackendResponse = JSON.parse(message.data);
      this._roomMap.get(obj.value.roomName).addMessage(
        // the message
        new Message(obj.value.message, obj.value.email, new Date()),
        // whether or not the message is actively being read
        obj.value.roomName === this.activeRoom);
    });
  }
  joinRoom(roomName: string): void {
    this._roomMap.set(roomName, new Rooms());
    this.showRoom(roomName);
  }
  leaveRoom(roomName: string): void {
    this._roomMap.delete(roomName);
    // don't hide the room; keep it visible
  }
  showRoom(roomName: string): void {
    this.activeRoom = roomName;
  }
  hideRoom(roomName: string): void {
    // do... something?
  }

  get roomMap(): Map<String, Rooms> {
    return this._roomMap;
  }
}
