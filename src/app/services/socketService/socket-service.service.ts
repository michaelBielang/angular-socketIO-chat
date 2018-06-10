import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs/index';
import {filter} from 'rxjs/operators';
import {BackendResponse} from "../../model/BackendResponse";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // subject that contains the observable to send messages to the websocket
  private _subject: Subject<any>;

  private socket: WebSocket;

  constructor() {
    this.createWebsocket();
  }

  private createWebsocket() {
    console.log('in createWebSocket');
    this.socket = new WebSocket('ws://141.82.173.168:8080/chatSocket/');
    // receive data from websocket
    const observable = Observable.create(
      (observer: Observer<MessageEvent>) => {
        this.socket.onmessage = observer.next.bind(observer);
        this.socket.onclose = observer.complete.bind(observer);
        return this.socket.close.bind(this.socket);
      }
    );
    // send data to websocket
    const observer = {
      next: (data: Object) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data));
        }
      }
    };
    this._subject = Subject.create(observer, observable);
  }

  disconnect() {
    if (this.socket.OPEN) {
      this._subject.unsubscribe();
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
  sendEvent(type: string, data: any) {
    if (this.socket === undefined) {
      this.createWebsocket();
    }
    const command = {
      type: type,
      value: data
    };
    this._subject.next(command);
  }

  /**
   * @returns {Observable<Object>}
   */
  receiveEvents(relevantEvent): Observable<Object> {
    return this._subject.asObservable()
      .pipe(filter((event: Event) => event != null))
      .pipe(filter((event: MessageEvent) => {
        const obj: BackendResponse = JSON.parse(event.data);
        return obj.type === relevantEvent;
      }));
  }

  /**
   * Helper method to find the returning event name
   * @returns {Observable<Object>}
   */
  receiveEventString(): Observable<Object> {
    return this._subject.asObservable()
      .pipe(filter((event: Event) => event != null));
  }

}
