import {Injectable} from '@angular/core';
import {SocketService} from '../socketService/socket-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isSuccess: boolean;


  constructor(private socketService: SocketService) {
  }

  login(username: string, password: string) {

    this.isSuccess = true;
    this.socketService.sendEvent('Login', 'template: {\n' +
      '        password: "1234",\n' +
      '        email: "phe@test.de"\n' +
      '    }');

    if (this.isSuccess) {
      return true;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
