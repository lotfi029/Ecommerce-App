import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoging: BehaviorSubject<boolean>;
  constructor() { 
    this.isLoging = new BehaviorSubject<boolean>(false);
  }
  setToken() {
    localStorage.setItem('loginToken', 'this for loging');
    
  }
  removeToken() {
    localStorage.removeItem('loginToken');
    
  }
  getCurrentToken() {
    return localStorage.getItem('loginToken');
  }
  isLogingNow() : boolean{
    return this.getCurrentToken() == null ? false : true;
  }
  getSubject() : BehaviorSubject<boolean>{
    if (this.getCurrentToken() == null)
      this.isLoging.next(false);
    else 
      this.isLoging.next(true);
    
    return this.isLoging;
  }

}

