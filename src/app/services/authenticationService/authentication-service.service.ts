import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor() {

  }

  login(username: string, password: string) {
    let connection = new WebSocket('ws://localhost:8080/echo/'), loginData = {
      name: "phe", password: "1234"
    }, loginData2 = {
      name: "u1", password: "1234"
    };
    let firstUser = true;
    connection.onopen = function () {
      setInterval(function () {
        let event = {
          type: "Login",
          value: username ? loginData : loginData2
        };
        firstUser = !firstUser;
        connection.send(JSON.stringify(event));
      }, 10000);
    };

    console.log("here");
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
