import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer, Subject} from 'rxjs/index';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // subject that contains the observable to send messages to the websocket
  private subject: Subject<any>;

  // messages received from the websocket
  private _inputMessage: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  private socket: WebSocket;

  constructor() {
    this.createWebsocket();
  }

  private createWebsocket() {
    console.log('in createWebSocket');
    this.socket = new WebSocket('ws://localhost:8080/chatSocket/');
    const observable = Observable.create(
      (observer: Observer<MessageEvent>) => {
        this.socket.onmessage = observer.next.bind(observer);
        this.socket.onclose = observer.complete.bind(observer);
        return this.socket.close.bind(this.socket);
      }
    );
    const observer = {
      next: (data: Object) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data));
        }
      }
    };
    this.subject = Subject.create(observer, observable);
    this.subject.subscribe(
      message => this._inputMessage = message.data
    );
  }

  disconnect() {
    if (this.socket.OPEN) {
      this.socket.close();
      this.socket = undefined;
    }
  }


  /**
   * Sends an event object to the sever over the socket. Fails, if
   * the socket is not open currently.
   *
   * @param type The type of the event object to send
   * @param data the object itself
   */
  sendEvent(type: string, data: any): this {
    if (this.socket === undefined) {
      this.createWebsocket();
    }
    const command = {
      type: type,
      value: data
    };
    this.subject.next(command);
    return this;
  }

  get inputMessage(): Observable<Object> {
    return this._inputMessage.asObservable().pipe(filter((event: Event) => event != null));
  }


}
