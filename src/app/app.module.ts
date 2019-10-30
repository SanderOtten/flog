import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { HttpLoaderFactory } from './core/services/translate/http.loader.factory';
import { CurrentLanguage } from './core/services/translate/currentlanguage';
import { FormatDateService } from './core/services/translate/formatdateservice';
import { IconService } from './core/services/utils/icon.service';

import { GraphQLModule } from './core/services/data/apollo.config';
import { AuthService } from './core/services/authentification/auth.service';
import { ParentDataService } from './core/services/data/parent.data.service';
import { ChildrenDataService } from './core/services/data/children.data.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { ChildrenComponent } from './modules/children/children.component';
import { PageNotFoundComponent } from './modules/pagenotfound/pagenotfound.component';
import { ChildComponent } from './modules/children/child/child.component';
import { MenuComponent } from './modules/menu/menu.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ParentComponent } from './modules/parent/parent.component';
import { PostComponent } from './modules/post/post.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChildrenComponent,
    ChildComponent,
    MenuComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ParentComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    CurrentLanguage,
    AuthService,
    ParentDataService,
    ChildrenDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
