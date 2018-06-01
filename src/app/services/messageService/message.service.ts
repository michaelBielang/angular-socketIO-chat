import {Injectable} from '@angular/core';

// import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private readonly _messages: string[] = ['Test', 'Test2'];

  // private subj: BehaviorSubject<string[]>  = new BehaviorSubject<string[]>(this._messages);


  add(message: string) {
    const list: Array<string> = [];
    if (this._messages.length > 10) {
      this._messages.splice(0, 1);
    }
    this._messages.push(message);
    // this._messages = list;
    // this.subj.next(list);
  }

  getMessages(): string[] {
    return this._messages;
  }
}
