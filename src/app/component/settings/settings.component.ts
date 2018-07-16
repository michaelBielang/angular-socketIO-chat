import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socketService/socket-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required, Validators.minLength(1)]],
      newPassword: ['', [Validators.required, Validators.minLength(1)]],
      newUsername: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.settingsForm.invalid) {
      return;
    }

    const email = this.settingsForm.controls['email'].value;
    const oldPassword = this.settingsForm.controls['oldPassword'].value;
    const newPassword = this.settingsForm.controls['newPassword'].value;
    const newUsername = this.settingsForm.controls['newUsername'].value;

    const renameUser = {
      email: email,
      userName: newUsername
    };

    const ChangeUserPassword = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

//TODO send success by alertService if succeeded

    this.socketService.sendEvent('ChangeUserPassword', ChangeUserPassword);
    this.socketService.sendEvent('RenameUser', renameUser);
    this.router.navigate(['/chat-rooms']);
  }
}
