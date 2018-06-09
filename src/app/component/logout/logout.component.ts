import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socketService/socket-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const userInputInTemplateForm = {};
    this.socketService.sendEvent('Logout', userInputInTemplateForm);
    console.log(this.socketService.receiveEvents);

    alert('You are logged out');
  }

}
