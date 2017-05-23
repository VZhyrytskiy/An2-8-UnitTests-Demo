import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {
  HeaderInlineComponent,
  HeaderInlineAutoCdComponent,
  HeaderComponent,
  WelcomeComponent,
  UserProfileComponent,
  UserListComponent,
  UserComponent,
  UserService,
  UserProfileService,
  UserListService
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    HeaderInlineComponent,
    HeaderInlineAutoCdComponent,
    HeaderComponent,
    WelcomeComponent,
    UserProfileComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    UserProfileService,
    UserListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
