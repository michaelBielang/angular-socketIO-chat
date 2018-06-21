import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';
import {BackendResponse} from '../../model/BackendResponse';
import {Message} from '../../model/Message';
import {SocketService} from '../socketService/socket-service.service';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _currentUser: User;
  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();
  private activeRoom: string;

  constructor(public socketService: SocketService) {
    // subscribe to messages
    this.socketService.receiveEvents('MessageSendToRoom').subscribe((message: MessageEvent) => {
      const obj: BackendResponse = JSON.parse(message.data);
      // add the new message to the respective room
      this._roomMap.get(obj.value.roomName).addMessage(
        // the message including message text, email and datetime of arrival
        new Message(obj.value.message, obj.value.email, new Date()),
        // boolean whether or not the message is actively being read
        obj.value.roomName === this.activeRoom);
    });
  }
  joinRoom(roomName: string): void {
    this._roomMap.set(roomName, new Rooms());
    this.showRoom(roomName);
  }
  leaveRoom(roomName: string): void {
    // todo: instead of deleting (because we want to keep it visible), change an attribute?
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

  set currentUser(currentUser: User) {
    this._currentUser = currentUser;
  }

  get currentUser(): User {
    return this._currentUser;
  }

}
