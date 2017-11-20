import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService extends BaseService{

  errorCredentials = false;
  constructor(http: HttpClient, private router: Router) {
    super(http);
    let token = localStorage.getItem('connect_token');
    if(token){
      this.setHeadersToken(token);
    }
  }

  login(credentials) {
    this.http.post(`${this.url}/login`, credentials).subscribe(token => {
      localStorage.setItem('connect_token', <string>token);
      this.setHeadersToken(token);
      this.router.navigateByUrl('/pizza/liste');
    }, res => {
      console.log(res.error.message);
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
