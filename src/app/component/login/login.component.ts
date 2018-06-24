import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alertService/alert-service.service';
import {SocketService} from '../../services/socketService/socket-service.service';
import {BackendResponse} from '../../model/BackendResponse';
import {UserServiceService} from "../../services/userService/user-service.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  // alertService optional, if time, implement, otherwise, kick.
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketService,
    private alertService: AlertService,
    private userService: UserServiceService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const email: String = this.loginForm.controls['email'].value;
    // todo add username to registration, not just email
    const currentUser: User = new User(email, email);

    const userInputInTemplateForm = {
      password: this.loginForm.controls['password'].value,
      email: email,
    };

    // TODO (optional: AlertService)
    this.socketService.receiveEvents('LoggedIn').subscribe((message: MessageEvent) => {
      const obj: BackendResponse = JSON.parse(message.data);
      this.userService.currentUser = currentUser;
      console.log(obj.type);
      console.log((obj.value));
      this.router.navigate(['/chat-rooms']);
    });

    this.loading = true;

    this.socketService.sendEvent('Login', userInputInTemplateForm);
  }

}
