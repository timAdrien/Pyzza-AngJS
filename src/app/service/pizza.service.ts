import { Injectable } from '@angular/core';
import { Pizza } from '../model/pizza';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as io from 'socket.io-client';
import {BaseService} from "./base.service";
import {AuthHttp} from "angular2-jwt";
import {RequestOptions} from '@angular/http';
import {AuthService} from "./auth.service";

@Injectable()
export class PizzaService extends BaseService {

  constructor (http: HttpClient, private authService: AuthService) {
    super(http);
  }

  /* Début Socket */

  onRefresh() {
    return new Observable(observer => {
      this.socket.on('refreshPizzas', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  refresh(){
    this.socket.emit('refreshPizzas');
  }

  /* Fin Socket */


  /* Début REST */

  getAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.url}/pizza/voir`, { headers: this.authService.headers });
  }

  getById(id): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.url}/pizza/voir/${id}`, { headers: this.authService.headers });
  }

  update(pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.url}/pizza/modifier`, pizza, { headers: this.authService.headers });
  }

  post(pizza): Observable<Pizza> {
    return this.http.post<Pizza>(`${this.url}/pizza/create`, pizza, { headers: this.authService.headers });

  }

  delete(id): Observable<Pizza> {
    return this.http.delete<Pizza>(`${this.url}/pizza/supprimer/${id}`, { headers: this.authService.headers });
  }

  /* Fin REST */
}
