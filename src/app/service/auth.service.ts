import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import {AppConfig} from "../app-config";

@Injectable()
export class AuthService {

  errorCredentials = false;
  constructor(private http: HttpClient, private router: Router, private appConfig: AppConfig) {
      let token = localStorage.getItem('connect_token');
      if(token){
        this.appConfig.setHeadersToken(token);
    }
  }

  login(credentials) {
    this.http.post(`${this.appConfig.getUrl()}/login`, credentials).subscribe(token => {
      localStorage.setItem('connect_token', <string>token);
      this.appConfig.setHeadersToken(token);
      this.router.navigateByUrl('/pizza/liste');
    }, res => {
      this.errorCredentials = true;
    });
  }

  loggedIn() {
    return tokenNotExpired('connect_token');
  }

  logout() {
    localStorage.removeItem('connect_token');
  }
}
