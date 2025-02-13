import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerceApp';
  language$: Observable<string>;
  dir: string = 'ltr';
  constructor(
    private store: Store<{ language: string }>
  ) {
    this.language$ = this.store.select('language');

    this.language$.subscribe({
      next: (lang) => this.dir = (lang == 'en' ? 'ltr' : 'rtl'),
    });
  }
}
