import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-messages-display-and-input',
  templateUrl: './messages-display-and-input.component.html',
  styleUrls: ['./messages-display-and-input.component.css']
})
export class MessagesDisplayAndInputComponent implements OnInit, AfterViewChecked {

  constructor() {
  }

  @ViewChild('chatcontent') private myScrollContainer: ElementRef;

    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { console.log(err); }
    }
}
