import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../component/login/login.component';
import {RegisterComponent} from '../../component/register/register.component';
import {ChatRoomsComponent} from '../../component/chat-rooms/chat-rooms.component';
import {LogoutComponent} from '../../component/logout/logout.component';
import {MessagesDisplayComponent} from "../../component/messagesdisplay/messagesdisplay.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'chat-rooms', component: ChatRoomsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
