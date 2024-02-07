import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatUiComponent } from './chat/chat-ui/chat-ui.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatUiComponent,
    LoginComponent,
    SignupComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
