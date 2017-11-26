import { Injectable } from '@angular/core';
import { Pizza } from '../model/pizza';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppConfig} from "../app-config";

@Injectable()
export class PizzaService {

  constructor (private http: HttpClient, private appConfig: AppConfig) {}

  /* Début Socket */

  onRefresh() {
    return new Observable(observer => {
      this.appConfig.getSocket().on('refreshPizzas', (data) => {
        observer.next(data);
      });
      return () => {
        this.appConfig.getSocket().disconnect();
      };
    });
  }

  refresh(){
    this.appConfig.getSocket().emit('refreshPizzas');
  }

  /* Fin Socket */


  /* Début REST */

  getAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.appConfig.getUrl()}/pizza/voir`, { headers: this.appConfig.getHeaders() });
  }

  getById(id): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.appConfig.getUrl()}/pizza/voir/${id}`, { headers: this.appConfig.getHeaders() });
  }

  update(pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.appConfig.getUrl()}/pizza/modifier`, pizza, { headers: this.appConfig.getHeaders() });
  }

  post(pizza): Observable<Pizza> {
    return this.http.post<Pizza>(`${this.appConfig.getUrl()}/pizza/create`, pizza, { headers: this.appConfig.getHeaders() });

  }

  delete(id): Observable<Pizza> {
    return this.http.delete<Pizza>(`${this.appConfig.getUrl()}/pizza/supprimer/${id}`, { headers: this.appConfig.getHeaders() });
  }

  /* Fin REST */
}
