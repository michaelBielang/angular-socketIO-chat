import {User} from './User';
import {MessageSet} from './MessageSet';
import {Message} from './Message';
import {Observable, from, BehaviorSubject} from 'rxjs/index';

export class Rooms {

  private _userList: User[];
  public userListChanges: BehaviorSubject<User[]>;
  private _messageSets: MessageSet[];
  public messageSetsChanges: BehaviorSubject<MessageSet[]>;
  private _numberUnreadMessages: number;
  public numberUnreadMessagesChanges: BehaviorSubject<number>;
  private _OPList: Map<String, User>;
  public OPListChanges: BehaviorSubject<Map<String, User>>;
  private _VoiceList: Map<String, User>;
  public VoiceListChanges: BehaviorSubject<Map<String, User>>;
  private _lastAuthor: string;
  public lastAuthorChanges: BehaviorSubject<string>;

  constructor() {
    this._numberUnreadMessages = 0;
    this.userListChanges = new BehaviorSubject([]);
    this.messageSetsChanges = new BehaviorSubject([]);
    this.numberUnreadMessagesChanges = new BehaviorSubject(0);
    this.OPListChanges = new BehaviorSubject(new Map<String, User>());
    this.VoiceListChanges = new BehaviorSubject(new Map<String, User>());
    this.lastAuthorChanges = new BehaviorSubject('nobody');
  }


  addMessage(msg: Message, userCanSeeMessage: boolean): void {
    if (! userCanSeeMessage) {
      this.numberUnreadMessages += 1;
    }
    // if author matches, just add the msg to the last MessageSet
    if (msg.author === this.lastAuthor && this.messageSets.length > 0) {
      this.messageSets[this.messageSets.length - 1].add(msg);
      console.log('a message was added to an exisiting messageSet');
      // else, create a new temp MessageSet using the msg.
    } else {
      // push the temp MessageSet to the MessagesDisplayComponent's messageSets
      this.lastAuthor = msg.author;
      this.messageSets.push(new MessageSet([msg]));
      console.log('a message was added to a new messageSet');
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


  set userList(value: User[]) {
    this._userList = value;
    this.userListChanges.next(this.userList);
  }

  set messageSets(value: MessageSet[]) {
    this._messageSets = value;
    this.messageSetsChanges.next(this.messageSets);
  }

  set numberUnreadMessages(value: number) {
    this._numberUnreadMessages = value;
    this.numberUnreadMessagesChanges.next(this.numberUnreadMessages);
  }

  set OPList(value: Map<String, User>) {
    this._OPList = value;
    this.OPListChanges.next(this.OPList);
  }

  set VoiceList(value: Map<String, User>) {
    this._VoiceList = value;
    this.VoiceListChanges.next(this.VoiceList);
  }

  set lastAuthor(value: string) {
    this._lastAuthor = value;
    this.lastAuthorChanges.next(this.lastAuthor);
  }
}
