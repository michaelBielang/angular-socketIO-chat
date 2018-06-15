import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _currentUser: User;
  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();

  constructor() {
  }

  get roomMap(): Map<String, Rooms> {
    return this._roomMap;
  }

  set currentUser(value: User) {
    this._currentUser = value;
  }

  get currentUser(): User {
    return this._currentUser;
  }
}
