export class Message {

  constructor(private _text: string, private _author: string, private _date: Date) {
  }

  // function
  get text(): string {
    return this._text;
  }

  get author(): string {
    return this._author;
  }

  get date(): Date {
    return this._date;
  }

  plainText(): string {
    return this.date + ' | ' + this.author + ':' + this.text;
  }

  printToConsole(): void {
    console.log(this.plainText());
  }
}

export default Message;
