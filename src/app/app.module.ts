import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
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
  UserService,
  UserProfileService,
  UserListService,
  TaskListService,
  ProductListComponent,
  ProductComponent,
  ProductListService,
  ProductDetailsComponent,
  PageNotFoundComponent
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
    UserComponent,
    TaskListComponent,
    TaskComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    UserProfileService,
    UserListService,
    TaskListService,
    ProductListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
