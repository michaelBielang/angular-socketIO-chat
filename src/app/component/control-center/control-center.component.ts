import { Component, OnInit } from '@angular/core';
import {animate} from '@angular/animations';

@Component({
  selector: 'app-control-center',
  styleUrls: ['./control-center.component.css'],

  template:`
    <ng-template><p>
    control-center works!
    </p>\</ng-template>
  `
})



export class ControlCenterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
