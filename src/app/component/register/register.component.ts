import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../services/socketService/socket-service.service';
import {BackendResponse} from "../../model/BackendResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  // messages received from the websocket
  // private _receiveEvents: BehaviorSubject<Object> = new BehaviorSubject<Object>(this._messages);

  constructor(private formBuilder: FormBuilder, private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const userInputInTemplateForm = {
      email: this.registerForm.controls['email'].value,
      name: this.registerForm.controls['userName'].value,
      password: this.registerForm.controls['password'].value,
    };

    // TODO check if user is already registered (optional: AlertService)

    this.socketService.messageListener.subscribe((event: string) => {
      const obj: BackendResponse = JSON.parse(event);
      console.log('type: ' + obj.type);
      if (obj.type === 'SocketIdEvent') {
        this.router.navigate(['/login']);
        this.socketService.messageListener.unsubscribe();
      }
    });

    this.socketService.sendEvent('RegisterUser', userInputInTemplateForm);
  }
}
