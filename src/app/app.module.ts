import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MessagesComponent} from './component/messages/messages.component';
import {InputFieldComponent} from './component/input-field/input-field.component';
import {FormsModule} from '@angular/forms';
import { ChatRoomsComponent } from './component/chat-rooms/chat-rooms.component';
import { ControlCenterComponent } from './component/control-center/control-center.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    InputFieldComponent,
    ChatRoomsComponent,
    ControlCenterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
