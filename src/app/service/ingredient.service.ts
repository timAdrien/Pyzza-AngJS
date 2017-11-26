import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app-config";
import {Observable} from "rxjs/Observable";
import {Ingredient} from "../model/ingredient";

@Injectable()
export class IngredientService {

  constructor (private http: HttpClient, private appConfig: AppConfig) {}

  /* Début Socket */

  onRefresh() {
    return new Observable(observer => {
      this.appConfig.getSocket().on('refreshIngredients', (data) => {
        observer.next(data);
      });
      return () => {
        this.appConfig.getSocket().disconnect();
      };
    });
  }

  refresh(){
    this.appConfig.getSocket().emit('refreshIngredients');
  }

  /* Fin Socket */


  /* Début REST */

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.appConfig.getUrl()}/ingredient/voir`, { headers: this.appConfig.getHeaders() });
  }

  getById(id): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.appConfig.getUrl()}/ingredient/voir/${id}`, { headers: this.appConfig.getHeaders() });
  }

  update(ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.appConfig.getUrl()}/ingredient/modifier`, ingredient, { headers: this.appConfig.getHeaders() });
  }

  post(ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.appConfig.getUrl()}/ingredient/create`, ingredient, { headers: this.appConfig.getHeaders() });

  }

  delete(id): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.appConfig.getUrl()}/ingredient/supprimer/${id}`, { headers: this.appConfig.getHeaders() });
  }

  /* Fin REST */
}
