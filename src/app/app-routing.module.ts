import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AuthGuard } from './service/auth-guard.service';
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'pizza/liste', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'ingredient', component: IngredientComponent, canActivate: [AuthGuard] },
];

export const AppRoutingModule = RouterModule.forRoot(
  routes,
  {
    enableTracing: true
  }
);

