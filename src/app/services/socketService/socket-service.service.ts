import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // subject that contains the observable to send messages to the websocket
  private subject: Subject<any>;

  // messages received from the websocket
  private _inputMessage: string;

  constructor() {
    this.subject = this.createWebsocket();
    this.subject.subscribe(
      message => this._inputMessage = message.data
    );
  }

  public createWebsocket(): Subject<MessageEvent> {
    console.log('in createWebSocket');
    const socket = new WebSocket('ws://localhost:8080/chatSocket/');
    const observable = Observable.create(
      (observer: Observer<MessageEvent>) => {
        socket.onmessage = observer.next.bind(observer);
        socket.onclose = observer.complete.bind(observer);
        return socket.close.bind(socket);
      }
    );
    const observer = {
      next: (data: Object) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }

  /**
   * Sends an event object to the sever over the socket. Fails, if
   * the socket is not open currently.
   *
   * @param type The type of the event object to send
   * @param data the object itself
   */
  sendEvent(type: string, data: any): this {
    const command = {
      type: type,
      value: data
    };
    this.subject.next(command);
    return this;
  }

  get inputMessage(): string {
    return this._inputMessage;
  }


}
