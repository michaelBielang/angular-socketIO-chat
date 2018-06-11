import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();

  constructor() {
  }
  joinRoom(roomName: string): void {
    this._roomMap.set(roomName, new Rooms());
  }
  leaveRoom(roomName: string): void {
    this._roomMap.delete(roomName);
  }


  get roomMap(): Map<String, Rooms> {
    return this._roomMap;
  }
}
