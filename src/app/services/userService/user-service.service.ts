import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';
import {BackendResponse} from '../../model/BackendResponse';
import {Message} from '../../model/Message';
import {SocketService} from '../socketService/socket-service.service';
import {User} from '../../model/User';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _currentUser: User;
  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();
  public roomMapChanges: BehaviorSubject<Map<String, Rooms>>;
  private _activeRoom: string;
  public activeRoomChanges: BehaviorSubject<string>;

  constructor(private socketService: SocketService) {
    this.roomMapChanges = new BehaviorSubject(new Map<String, Rooms>());
    // todo change hardcoded default activeRoom
    this.activeRoomChanges = new BehaviorSubject('general');
  }
  joinRoom(roomName: string): void {
    this._roomMap.set(roomName, new Rooms());
    // todo: decide if we want to alert subscribers NOW or AFTER FEEDBACK from the server
    this.roomMapChanges.next(this.roomMap);
    this.socketService.sendEvent('JoinRoom', {
      'roomName': roomName
    });
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

  get activeRoom(): string {
    return this._activeRoom;
  }
  set activeRoom(room: string) {
    this._activeRoom = room;
    this.activeRoomChanges.next(this.activeRoom);
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
