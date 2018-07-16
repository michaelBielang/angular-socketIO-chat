import {Message} from './Message';
export class MessageSet {

  _author;
  public isMedia: boolean;
  public mediaURL: string;

  constructor(private _messages: Message[]) {
    this._author = _messages[0].author;
    for (const msg of _messages) {
      if (msg.author !== this.author) {
        throw new Error ('not all messages given to MessageSet constructor are from the same author!');
      }
    }
  }

  add(msg: Message) {
    if (msg.author !== this.author) {
      throw new Error ('Message author doesn\'t match MessageSet author!');
    }
    this._messages.push(msg);
  }

  // function
  get messages(): Message[] {
    return this._messages;
  }

  get author(): string {
    return this._author;
  }

}
