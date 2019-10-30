import { Component, OnInit } from '@angular/core';
import { CurrentLanguage } from './core/services/translate/currentlanguage';
import { AuthService } from './core/services/authentification/auth.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'so-flog';

  loggedIn: boolean = false;

  constructor( public currentLanguage: CurrentLanguage,
               public authService: AuthService,
             ) {
     currentLanguage.setNewLang('');
  }

  ngOnInit(): void {
    this.currentLanguage.setNewLang('');

    this.authService.isAuthenticated
      .pipe(distinctUntilChanged())
      .subscribe(isAuthenticated => {
        this.loggedIn = isAuthenticated

        if ( this.loggedIn ) {
        }
    });

    if ( this.loggedIn ) {
    }
  }

  switchLanguage($language) {
    this.currentLanguage.setNewLang('$language');
  }
}
