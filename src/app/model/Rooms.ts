import {User} from './User';
import {MessageSet} from "./MessageSet";
import {Message} from "./Message";

export class Rooms {

  constructor() {
    this.numberUnreadMessages = 0;
  }

  private _userList: User[];
  private messageSets: MessageSet[];
  private _OPList: Map<String, User>;
  private _VoiceList: Map<String, User>;
  private lastAuthor: string;
  private numberUnreadMessages;

  addMessage(msg: Message, userCanSeeMessage: boolean): void {
    if (! userCanSeeMessage) {
      this.numberUnreadMessages += 1;
    }
    // if author matches, just add the msg to the last MessageSet
    if (msg.author === this.lastAuthor && this.messageSets.length > 0) {
      this.messageSets[this.messageSets.length - 1].add(msg);
      // else, create a new temp MessageSet using the msg
    } else {
      // push the temp MessageSet to the MessagesDisplayComponent's messageSets
      this.lastAuthor = msg.author;
      this.messageSets.push(new MessageSet([msg]));
    }
  }

  hasOP(roomName: String): boolean {
    return true;
  }

  hasVoice(roomName: String): boolean {
    return true;
  }

  get userList(): User[] {
    return this._userList;
  }

  get roomMessages(): String[] {
    return this.roomMessages;
  }

  get OPList(): Map<String, User> {
    return this._OPList;
  }

  get VoiceList(): Map<String, User> {
    return this._VoiceList;
  }
}
