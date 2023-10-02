import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})


//storage service to store user tokens and also headers
export class StorageService {
  token = ''


  constructor() {}

 //clear localstorage
  clean(): void {
    window.localStorage.clear();
  }
  //save user token to localstorage
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  //get user token from localstorage
  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  //check if user is logged in

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  //functions to user header for authentications and authorization
  getHeader() : any{
    this.token = this.getUser().token;
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` })
      };

      return httpOptions;
  }
  
  //check if token is expired user logged in
  isLogged : boolean ;
  isAuthenticated(): boolean {
    this.token = this.getUser().token;
    

    if (this.token) {
      const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;

      if (expiry * 1000 > Date.now()) {
        this.isLogged = true;
        return true;
      }
      else{
        this.isLogged = false;
        window.location.href = '/signin'
        return this.isLogged;
      }
    }
    else{
      window.location.href = '/signin'
    }
    return this.isLogged;
  
  }


}