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
    return this.newPasswordForm.controls;
  }

  onSubmit() {
    console.log('Now is when validation should take place');
  }

  onSubmit() {
    this.submitted = true;

    const userInputInTemplateForm = {
      oldPassword: this.newPasswordForm.controls['oldPassword'].value,
      newPassword: this.newPasswordForm.controls['newPassword'].value,
      newPasswordConfirm: this.newPasswordForm.controls['newPasswordConfirm'].value,
    };

    // first, make sure passwords match

    // then, try to log in using oldPassword

      // if successful, go back to login with success message
      // else, display error

    // stop here if form is invalid
    if (this.newPasswordForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)');
  }
}


}
