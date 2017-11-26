
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as io from 'socket.io-client';

@Injectable()
export class AppConfig {

  private url = "https://pyzza-timadr.c9users.io";
  private socket;
  private headers;

  constructor (protected http: HttpClient) {
    this.socket = io(this.url);
  }

  setHeadersToken(token){
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${<string>token}`,
      'Content-Type': 'application/json'
    });
  }

  getSocket() {
    return this.socket;
  }

  getUrl() {
    return this.url;
  }

  getHeaders() {
    return this.headers;
  }
}
