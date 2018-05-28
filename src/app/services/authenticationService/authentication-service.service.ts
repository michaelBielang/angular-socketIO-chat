import {Injectable} from '@angular/core';
import {SocketService} from '../socketService/socket-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isSuccess: boolean;


  constructor(private socketService: SocketService) {
  }

  performLoginRequest(command: string) {

    this.isSuccess = true;
    this.socketService.sendEvent('Login', command);

    if (this.isSuccess) {
      return true;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
