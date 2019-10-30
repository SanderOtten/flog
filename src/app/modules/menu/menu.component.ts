import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authentification/auth.service';
import { CurrentLanguage } from '../../core/services/translate/currentlanguage';


@Component({
  selector: 'flog-menu',
  templateUrl: './menu.component.html'
})

@Injectable()
export class MenuComponent implements OnInit {

  activeLink = '';

  constructor( private router: Router,
               public authService: AuthService,
               public currentLanguage: CurrentLanguage
             ) {}

  ngOnInit() {}

  navigateTo($link) {
    this.activeLink = $link;
    this.router.navigate([$link], {skipLocationChange: true});
  }

  logout() {
    this.authService.logout();
  }

  changeLang($lang) {
    this.currentLanguage.setNewLang($lang);
  }

  activeLang($lang) {
    return this.currentLanguage.lang === $lang;
  }
}
