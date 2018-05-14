import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../messageService/message.service";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {


  constructor(public messageService: MessageService) {
  }

  public sendMessage(newInput: string) {
    if (newInput) {
      this.messageService.add(newInput);
    }
  }

  ngOnInit() {
  }

}
