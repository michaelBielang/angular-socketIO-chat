import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MessagesDisplayComponent} from './component/messagesdisplay/messagesdisplay.component';
import {InputFieldComponent} from './component/input-field/input-field.component';
import {ChatRoomsComponent} from './component/chat-rooms/chat-rooms.component';
import {LoginComponent} from './component/login/login.component';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import {RegisterComponent} from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LogoutComponent} from './component/logout/logout.component';
import {RoomListComponent} from './component/room-list/room-list.component';
import {SettingsComponent} from './component/settings/settings.component';
import {MessagesDisplayAndInputComponent} from './component/messages-display-and-input/messages-display-and-input.component';
import {PeopleListComponent} from './component/people-list/people-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesDisplayComponent,
    InputFieldComponent,
    ChatRoomsComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    RoomListComponent,
    SettingsComponent,
    MessagesDisplayAndInputComponent,
    PeopleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
