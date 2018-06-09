import {Injectable} from '@angular/core';
import Message from '../../model/Message';

// import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private readonly _messages: Message[] = [
     new Message( 'Test', 'nobody', new Date()),
     new Message( 'Test2', 'nemo', new Date())
    ];

  // private subj: BehaviorSubject<string[]>  = new BehaviorSubject<string[]>(this._messages);


  add(message: string) {
    const list: Array<string> = [];
    if (this._messages.length > 10) {
      this._messages.splice(0, 1);
    }
    this._messages.push(new Message(message, 'message.service.ts', new Date()));
    // this._messages = list;
    // this.subj.next(list);
  }

  getMessages(): Message[] {
    return this._messages;
  }
}
