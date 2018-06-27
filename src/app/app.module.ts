import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  IoComponent,
  LightSwitchComponent
} from './01-isolated-tests/components';
import {
  HeaderInlineComponent,
  HeaderInlineAutoCdComponent,
  HeaderComponent,
  WelcomeComponent,
  UserProfileComponent,
  UserListComponent,
  UserComponent,
  TaskListComponent,
  TaskComponent,
  WelcomeService,
  UserProfileService,
  UserListService,
  TaskListService,
  ProductListComponent,
  ProductComponent,
  ProductListService,
  ProductDetailsComponent,
  PageNotFoundComponent,
  MsgListComponent,
  Welcome1Component,
  AboutComponent
} from './02-integrated-tests/components';
import { HighlightDirective } from './02-integrated-tests/directives';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HeaderInlineComponent,
    HeaderInlineAutoCdComponent,
    HeaderComponent,
    WelcomeComponent,
    UserProfileComponent,
    UserListComponent,
    UserComponent,
    TaskListComponent,
    TaskComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    MsgListComponent,
    AboutComponent,
    HighlightDirective,
    LightSwitchComponent,
    Welcome1Component,
    IoComponent
  ],
  providers: [
    WelcomeService,
    UserProfileService,
    UserListService,
    TaskListService,
    ProductListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
