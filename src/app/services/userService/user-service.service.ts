import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';
import {SocketService} from '../socketService/socket-service.service';
import {User} from '../../model/User';
import {BehaviorSubject} from "rxjs/index";
import {BackendResponse} from "../../model/BackendResponse";
import {InviteOPVoice} from "../../model/InviteOPVoice";
import {AlertService} from "../alertService/alert-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _currentUser: User;
  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();
  public roomMapChanges: BehaviorSubject<Map<String, Rooms>>;
  private _activeRoom: string;
  public activeRoomChanges: BehaviorSubject<string>;

  constructor(private socketService: SocketService, private alertService: AlertService) {
    this.roomMapChanges = new BehaviorSubject(new Map<String, Rooms>());
    // todo change hardcoded default activeRoom
    this.activeRoomChanges = new BehaviorSubject('general');
  }

  /**
   * This function intercepts possible invites, granted voices/op's
   * Important: Function get's NOT called if the origin event was not legitimated to send an event.
   */
  public interceptIncomingCommands() {
    // TODO (optional: AlertService)
    this.socketService.messageListener.subscribe((event: string) => {
      const backendResponse: BackendResponse = JSON.parse(event);
      const inviteOPVoice: InviteOPVoice = backendResponse.value;
      if (inviteOPVoice.email === this._currentUser.email) {
        if (backendResponse.type === 'InviteToRoom') {
          this.alertService.notifyUser('InviteToRoom', inviteOPVoice.roomName);
        } else if (backendResponse.type === 'GrantVoice') {
          this.alertService.notifyUser('GrantVoice', inviteOPVoice.roomName);
        } else if (backendResponse.type === 'GrantOp') {
          this.alertService.notifyUser('GrantOp', inviteOPVoice.roomName);
        }
      }
    });
  }

  /**
   * This function handles the function to join other rooms within this service.
   * @param {string} roomName
   */
  joinRoom(roomName: string): void {

    //check if user has already joined the room
    if (this._roomMap.has(roomName)) {
      console.log('Already joined the room; ignoring duplicate join!');
      this.showRoom(roomName);
      return;
    }


    this._roomMap.set(roomName, new Rooms());
    // todo: decide if we want to alert subscribers NOW or AFTER FEEDBACK from the server
    this.roomMapChanges.next(this.roomMap);
    this.socketService.sendEvent('JoinRoom', {
      'roomName': roomName
    });
    // wait for 'RoomJoined'
    this.socketService.messageListener.subscribe((message: string) => {
      const obj: BackendResponse = JSON.parse(message);
      if (obj.type === 'RoomJoined' && obj.value.email === this.currentUser && obj.value.roomName === roomName) {
        this.showRoom(roomName);
      }
      // todo wait for 5 seconds before returning an error? @Andreas
    });
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
