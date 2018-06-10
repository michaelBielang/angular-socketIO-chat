import {inject, TestBed} from '@angular/core/testing';
import {BackendResponse} from '../../model/BackendResponse';

import {SocketServiceService} from './socket-service.service';

describe('SocketServiceService', () => {

  const userInputInTemplateForm = {
    password: '1234',
    email: 'phe@test.de',
  };

  let socketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketServiceService]
    });
    socketService = new SocketServiceService();
  });
  let field;

  it('should be created', inject([SocketServiceService], (service: SocketServiceService) => {
    expect(SocketServiceService).toBeTruthy();
    socketService.sendEvent('Login');

    this.socketService.receiveEvents('LoggedIn').subscribe((message: MessageEvent) => {
      const obj: BackendResponse = JSON.parse(message.data);
      field = obj.value;

    });
    console.log(field);

  }));
});
