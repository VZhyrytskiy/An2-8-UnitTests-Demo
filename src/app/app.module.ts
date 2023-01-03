import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  IoComponent,
  LightSwitchComponent
} from './01-isolated-tests/3-components';
import { TitleCasePipe } from './01-isolated-tests/2-pipes/title-case/title-case.pipe';
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
import { ChildComponent } from './02-integrated-tests/components/08-component-w-view-child/child/child.component';
import { ParentComponent } from './02-integrated-tests/components/08-component-w-view-child/parent/parent.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
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
    IoComponent,
    TitleCasePipe,
    ChildComponent,
    ParentComponent
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
