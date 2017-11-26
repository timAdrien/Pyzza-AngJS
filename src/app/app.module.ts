import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
  MatIconModule,
  MatListModule,
  MatChipsModule,
  MatSlideToggleModule,
} from '@angular/material';
import { ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { PopoverModule } from "ng2-popover";

import { PipeOrderPizza } from './pipe/pipe-order-pizza';
import { PipeFilterNomPizza } from './pipe/pipe-filter-nom-pizza';

import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { EditerPizzaDialogComponent } from './components/editer-pizza-dialog/editer-pizza-dialog.component';
import { SupprimerPizzaDialogComponent } from './components/supprimer-pizza-dialog/supprimer-pizza-dialog.component';
import { AjouterPizzaDialogComponent } from './components/ajouter-pizza-dialog/ajouter-pizza-dialog.component';
import { SpinnerComponent } from './components/spinner-loader/spinner-loader.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';


import { PizzaService } from './service/pizza.service';
import { SpinnerService } from "./service/spinner.service";
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./service/auth-guard.service";
import {AppConfig} from "./app-config";
import { FileuploadComponent } from './components/file-upload/file-upload.component';
import {FunctionService} from './service/function.service';
import { IngredientDetailComponent } from './components/ingredient-detail/ingredient-detail.component';
import {IngredientService} from "./service/ingredient.service";


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    IngredientComponent,
    EditerPizzaDialogComponent,
    SupprimerPizzaDialogComponent,
    AjouterPizzaDialogComponent,
    SpinnerComponent,
    LoginComponent,
    ErrorComponent,
    FileuploadComponent,
    PipeOrderPizza,
    PipeFilterNomPizza,
    IngredientDetailComponent
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
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    PopoverModule,
    ToastModule.forRoot()
  ],
  exports: [
  ],
  providers: [PizzaService, SpinnerService, AuthGuard, AuthService, AppConfig, FunctionService, IngredientService],
  bootstrap: [AppComponent],
  entryComponents: [
    EditerPizzaDialogComponent,
    SupprimerPizzaDialogComponent,
    AjouterPizzaDialogComponent
  ]
})
export class AppModule {}
