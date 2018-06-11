import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();
  private activeRoom: string;

  constructor() {
    // subscribe to messages

  }
  joinRoom(roomName: string): void {
    this._roomMap.set(roomName, new Rooms());
    showRoom(roomName);
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
