import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MessagesComponent} from './component/messages/messages.component';
import {InputFieldComponent} from './component/input-field/input-field.component';
import {ChatRoomsComponent} from './component/chat-rooms/chat-rooms.component';
import {ControlCenterComponent} from './component/control-center/control-center.component';
import {LoginComponent} from './component/login/login.component';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import {RegisterComponent} from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LogoutComponent } from './component/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    InputFieldComponent,
    ChatRoomsComponent,
    ControlCenterComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
