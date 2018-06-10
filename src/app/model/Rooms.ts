import {User} from './User';

export class Rooms {

  private _userList: User[];
  private _roomMessages: String[];
  private _OPList: Map<String, User>;
  private _VoiceList: Map<String, User>;

  hasOP(roomName: String): boolean {
    return OPList
  ...
    ;
  }

  hasVoice(roomName: String): boolean {
    return VoiceList
  ....
    ;
  }


  get userList(): User[] {
    return this._userList;
  }

  get roomMessages(): String[] {
    return this._roomMessages;
  }

  get OPList(): Map<String, User> {
    return this._OPList;
  }

  get VoiceList(): Map<String, User> {
    return this._VoiceList;
  }
}
