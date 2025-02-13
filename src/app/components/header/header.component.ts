import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { __makeTemplateObject } from 'tslib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { languageAction } from '../../store/language/language.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoging: boolean;
  language: Observable<string>;
  displayLang: string = '';
  constructor(
    private _loginServer: LoginService,
    private _store: Store<{ language: string }>
  ) {
    this.isLoging = false;
    this.language = this._store.select('language');
  }

  ngOnInit() {
    this._loginServer.getSubject().subscribe({
      next: (res) => (this.isLoging = res),
    });
    this.language.subscribe((lang) => (this.displayLang = lang));
  }
  changLanguage() {
    this._store.dispatch(
      languageAction({ lang: this.displayLang == 'en' ? 'ar' : 'en' })
    );
  }
}
