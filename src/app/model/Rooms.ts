import {User} from './User';
import {MessageSet} from "./MessageSet";
import {Message} from "./Message";

export class Rooms {

  constructor() {
    this._numberUnreadMessages = 0;
  }

  private _userList: User[];
  private _messageSets: MessageSet[];
  private _numberUnreadMessages: number;
  private _OPList: Map<String, User>;
  private _VoiceList: Map<String, User>;
  private lastAuthor: string;

  addMessage(msg: Message, userCanSeeMessage: boolean): void {
    if (! userCanSeeMessage) {
      this._numberUnreadMessages += 1;
    }
    // if author matches, just add the msg to the last MessageSet
    if (msg.author === this.lastAuthor && this._messageSets.length > 0) {
      this._messageSets[this._messageSets.length - 1].add(msg);
      // else, create a new temp MessageSet using the msg.
    } else {
      // push the temp MessageSet to the MessagesDisplayComponent's messageSets
      this.lastAuthor = msg.author;
      this._messageSets.push(new MessageSet([msg]));
    }
  }

  hasOP(roomName: String): boolean {
    return this._OPList.has(roomName);
  }

  hasVoice(roomName: String): boolean {
    return true;
  }

  get userList(): User[] {
    return this._userList;
  }
  get messageSets(): MessageSet[] {
    return this._messageSets;
  }

  get numberUnreadMessages(): number {
    return this._numberUnreadMessages;
  }

  get OPList(): Map<String, User> {
    return this._OPList;
  }

  get VoiceList(): Map<String, User> {
    return this._VoiceList;
  }
}
