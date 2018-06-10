import {Injectable} from '@angular/core';
import {Rooms} from '../../model/Rooms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _roomMap: Map<String, Rooms> = new Map<String, Rooms>();

  constructor() {
  }

  get roomMap(): Map<String, Rooms> {
    return this._roomMap;
  }
}
