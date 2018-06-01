import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../services/socketService/socket-service.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPasswordForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private socketService: SocketService) { }

  ngOnInit() {
    this.newPasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPasswordConfirm: ['', [Validators.required]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log('Now is when validation should take place');
  }

}
