import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isLoging!: boolean;
  constructor(private _loginServer: LoginService) {
    // this.isLoging = false;
  }

  ngOnInit(): void {
    this._loginServer.getSubject().subscribe({
      next: (res) => {
        this.isLoging = res;
      }
    })
  }

  login() {
    this._loginServer.setToken();
    this._loginServer.getSubject().subscribe({
      next: (res) => {
        this.isLoging = res
      }
    })
  }
  logout() {
    this._loginServer.removeToken();
    this._loginServer.getSubject().subscribe({
      next: (res) => {
        this.isLoging = res
      }
    })
  }
}
