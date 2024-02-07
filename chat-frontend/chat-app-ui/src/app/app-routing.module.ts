import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatUiComponent } from './chat/chat-ui/chat-ui.component';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component'

const routes: Routes = [
  { path: 'chats', component: ChatUiComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }