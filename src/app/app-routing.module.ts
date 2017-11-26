import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { AuthGuard } from './service/auth-guard.service';
import { LoginComponent } from "./components/login/login.component";
import {IngredientDetailComponent} from "./components/ingredient-detail/ingredient-detail.component";

const routes: Routes = [
  { path: '', component: AccueilComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pizza/liste', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'ingredient',
    children: [
      { path: '', component: IngredientComponent, canActivate: [AuthGuard] },
      { path: 'liste', component: IngredientComponent, canActivate: [AuthGuard] },
      { path: 'detail', component: IngredientDetailComponent, canActivate: [AuthGuard] },
      { path: 'detail/:id', component: IngredientDetailComponent, canActivate: [AuthGuard] }
    ]
  }
];

export const AppRoutingModule = RouterModule.forRoot(
  routes,
  {
    enableTracing: true
  }
);

