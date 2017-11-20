import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule
} from '@angular/material';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { EditerPizzaDialogComponent } from './editer-pizza-dialog/editer-pizza-dialog.component';
import { SupprimerPizzaDialogComponent } from './supprimer-pizza-dialog/supprimer-pizza-dialog.component';
import { AjouterPizzaDialogComponent } from './ajouter-pizza-dialog/ajouter-pizza-dialog.component';


import { PizzaService } from './service/pizza.service';
import { SpinnerComponent } from './spinner-loader/spinner-loader.component';
import {SpinnerService} from "./service/spinner.service";
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./service/auth-guard.service";
import {AuthService} from "./service/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    IngredientComponent,
    EditerPizzaDialogComponent,
    SupprimerPizzaDialogComponent,
    AjouterPizzaDialogComponent,
    SpinnerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [PizzaService, SpinnerService, AuthGuard, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    EditerPizzaDialogComponent,
    SupprimerPizzaDialogComponent,
    AjouterPizzaDialogComponent
  ]
})
export class AppModule { }
