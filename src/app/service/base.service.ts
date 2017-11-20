import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as io from 'socket.io-client';

export class BaseService {

  protected url = "https://pyzza-timadr.c9users.io";
  protected socket;
  public headers;

  constructor (protected http: HttpClient) {
    this.socket = io(this.url);
  }

  setHeadersToken(token){
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${<string>token}`,
      'Content-Type': 'application/json'
    });
  }
}
