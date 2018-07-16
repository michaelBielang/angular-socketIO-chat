import {MessageSet} from './MessageSet';
import {Message} from './Message';
import {BehaviorSubject} from 'rxjs/index';

export class Rooms {

  private _userList: Set<string>;
  public userListChanges: BehaviorSubject<Set<string>>;
  private _messageSets: MessageSet[];
  public messageSetsChanges: BehaviorSubject<MessageSet[]>;
  private _numberUnreadMessages: number;
  public numberUnreadMessagesChanges: BehaviorSubject<number>;
  private _OPList: Set<string>;
  public OPListChanges: BehaviorSubject<Set<string>>;
  private _VoiceList: Set<string>;
  public VoiceListChanges: BehaviorSubject<Set<string>>;
  private _lastAuthor: string;
  public lastAuthorChanges: BehaviorSubject<string>;
  private lastMessageWasMedia: boolean;

  constructor() {
    this.userListChanges = new BehaviorSubject(new Set());
    this.userList = new Set();
    this.messageSetsChanges = new BehaviorSubject(
      [(new MessageSet(
        [new Message('Welcome!', 'System', new Date())
        ]))
      ]);
    this.messageSets = [];
    this.numberUnreadMessagesChanges = new BehaviorSubject(0);
    this.numberUnreadMessages = 0;
    this.OPListChanges = new BehaviorSubject(new Set())
    this.OPList = new Set();
    this.VoiceListChanges = new BehaviorSubject(new Set());
    this.VoiceList = new Set();
    this.lastAuthorChanges = new BehaviorSubject('nobody');
    this.lastMessageWasMedia = false;
  }


  addMessage(msg: Message, userCanSeeMessage: boolean): void {
    if (!userCanSeeMessage) {
      this.numberUnreadMessages += 1;
    }
    // if giphy, add new messageSet
    if (msg.text.startsWith('!giphy')) {
      this.lastMessageWasMedia = true;

      this.lastAuthor = msg.author;
      // this weird construct forces calling the setter, thereby doing Observable.next()
      const tmpMessageSets = this.messageSets;
      let mediaMessageSet = new MessageSet([msg]);
      mediaMessageSet.isMedia = true;
      var request = new XMLHttpRequest();
      let wish = msg.text.split(' ')[1];
      request.open('GET', '/gifs/random?api_key=V8v8bUpY6A78m3Ao59coW026RJ0VvDOA&tag=' + wish + '&rating=G', false);  // `false` makes the request synchronous
      request.send();

      if (request.status === 200) {
        let gifurl = JSON.parse(request.responseText).data.images.fixed_height.url;
        mediaMessageSet.mediaURL = gifurl;
        tmpMessageSets.push(mediaMessageSet);
        this.messageSets = tmpMessageSets;
      }
      return;
    }
    // if author matches, just add the msg to the last MessageSet
    if (msg.author === this.lastAuthor && this.messageSets.length > 0 && !this.lastMessageWasMedia) {
      // todo make sure the setter of messageSets is called to trigger observer update
      this.messageSets[this.messageSets.length - 1].add(msg);
      // else, create a new temp MessageSet using the msg.
    } else {
      this.lastMessageWasMedia = false;
      // push the temp MessageSet to the MessagesDisplayComponent's messageSets
      this.lastAuthor = msg.author;
      // this weird construct forces calling the setter, thereby doing Observable.next()
      const tmpMessageSets = this.messageSets;
      tmpMessageSets.push(new MessageSet([msg]));
      this.messageSets = tmpMessageSets;
    }
  }

  hasOP(roomName: string): boolean {
    return this._OPList.has(roomName);
  }

  hasVoice(roomName: string): boolean {
    return this._VoiceList.has(roomName);
  }

  get userList(): Set<string> {
    return this._userList;
  }

  get messageSets(): MessageSet[] {
    return this._messageSets;
  }

  get numberUnreadMessages(): number {
    return this._numberUnreadMessages;
  }

  get OPList(): Set<string> {
    return this._OPList;
  }

  get VoiceList(): Set<string> {
    return this._VoiceList;
  }

  get lastAuthor(): string {
    return this._lastAuthor;
  }


  set userList(value: Set<string>) {
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

  set OPList(value: Set<string>) {
    this._OPList = value;
    this.OPListChanges.next(this.OPList);
  }

  set VoiceList(value: Set<string>) {
    this._VoiceList = value;
    this.VoiceListChanges.next(this.VoiceList);
  }

  set lastAuthor(value: string) {
    this._lastAuthor = value;
    this.lastAuthorChanges.next(this.lastAuthor);
  }
}
