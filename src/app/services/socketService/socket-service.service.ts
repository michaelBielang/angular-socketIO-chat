import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/');
  }

  public createWebsocket(): Subject<MessageEvent> {
    let observable = Observable.create(
      (observer: Observer<MessageEvent>) => {
        this.socket.onmessage = observer.next.bind(observer);
        this.socket.onerror = observer.error.bind(observer);
        this.socket.onclose = observer.complete.bind(observer);
        return this.socket.close.bind(this.socket);
      }
    );
    let observer = {
      next: (data: Object) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data));
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
    this.socket.send(JSON.stringify(command));
    return this;
  }

}
