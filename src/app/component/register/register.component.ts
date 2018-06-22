import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../services/socketService/socket-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private readonly _messages: MessageEvent[] = [];
  private success: boolean = false;

  registerForm: FormGroup;
  // messages received from the websocket
  // private _receiveEvents: BehaviorSubject<Object> = new BehaviorSubject<Object>(this._messages);

  constructor(private formBuilder: FormBuilder, private socketService: SocketService) {
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
    this.socketService.receiveEvents('UserRegistered').subscribe((message: MessageEvent) => {
      this.success = true;
    });

    this.socketService.sendEvent('RegisterUser', userInputInTemplateForm);

    if (this.success)
      alert('SUCCESS!! :-)');
    else{
      alert('User already registered. Please chose another username');
    }
  }
}
