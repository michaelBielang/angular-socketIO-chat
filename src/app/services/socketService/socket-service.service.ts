import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer, Subject} from 'rxjs/index';
import {filter} from 'rxjs/operators';
import {BackendResponse} from '../../model/BackendResponse';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // subject that contains the observable to send messages to the websocket
  private _subject: Subject<any>;
  private _observable: Observable<Object>;
  public messageListener: BehaviorSubject<string>;

  private socket: WebSocket;

  constructor() {
    this.createWebsocket();
    this.messageListener = new BehaviorSubject('initial string');
    this.receiveEvents().subscribe((messageEvent: MessageEvent) => {
      this.messageListener.next(messageEvent.data);
    });
  }

  private createWebsocket() {
    this.socket = new WebSocket('ws://localhost:8080/chatSocket/');
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
    this.bindObservable();
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
    console.log('socketService: sending message of type', type);
    if (this.socket === undefined) {
      console.log('sendEvent creating new websocket!');
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
  receiveEvents(): Observable<Object> {
    return this._observable;
  }

  private bindObservable(): void {
    this._observable = this._subject.asObservable()
      .pipe(filter((event: Event) => event != null));
  }


}
