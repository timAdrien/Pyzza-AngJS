import {Component, NgModule, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import { PizzaService } from '../../service/pizza.service';
import { Pizza } from '../../model/pizza';
import * as _ from 'lodash';

import { EditerPizzaDialogComponent } from '../editer-pizza-dialog/editer-pizza-dialog.component';

import { PipeOrderPizza } from '../../pipe/pipe-order-pizza';

import { MatDialogModule, MatDialog } from '@angular/material';
import { SupprimerPizzaDialogComponent } from '../supprimer-pizza-dialog/supprimer-pizza-dialog.component';
import { AjouterPizzaDialogComponent } from '../ajouter-pizza-dialog/ajouter-pizza-dialog.component';
import { SpinnerComponent } from '../spinner-loader/spinner-loader.component';
import {SpinnerService} from "../../service/spinner.service";
import {ToastsManager} from "ng2-toastr";
import {FunctionService} from "../../service/function.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MatDialog, MatDialogModule, PizzaService]
})
export class AccueilComponent implements OnInit {

  order = "prix";
  ascending = false;
  filterNom = "";
  pizzas: Pizza[];
  pizzaCurrent: Pizza;
  pizzaBefore: string;
  errorMessage: any;
  spinner: SpinnerComponent;

  constructor(  private pizzaService: PizzaService,
                private router: Router,
                public dialog: MatDialog,
                private spinnerService: SpinnerService,
                private toastr: ToastsManager,
                private _vcr: ViewContainerRef,
                private functionService: FunctionService
            ) {
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.pizzas = [];
    this.getPizzas();
    this.pizzaService.onRefresh().subscribe(() => {
      this.getPizzas();
      this.toastr.warning("Une pizza a été mise à jour...", "Maj d'une pizza");
    }, error => {
      this.toastr.error("Erreur de mise à jour des pizzas...", "Erreur");
      this.errorMessage = <any>error;
    });
  }

  /* Début Appels Services */
  getPizzas(): void {
    this.spinnerService.show('loader');
    this.pizzaService.getAll().subscribe(pizzas => {
      this.spinnerService.hide('loader');
      this.pizzas = pizzas;
    }, error => {
      this.toastr.error("Erreur de chargement des pizzas...", "Erreur", {dismiss: 'controlled'});
      this.errorMessage = <any>error;
    });
  }
  /* Fin Appels Services */


  /* Début Ajouter */
  openAjouterPizzaDialog(): void {
    this.pizzaCurrent = new Pizza('','','','', { data: '', contenType: '' });
    let dialogRef = this.dialog.open(AjouterPizzaDialogComponent, {
      width: '350px'
    });

    dialogRef.componentInstance.pizza = this.pizzaCurrent;
    dialogRef.componentInstance.dialogReference = dialogRef;
    dialogRef.componentInstance.confirmPostPizza.subscribe(pizzaDialog => {
      this.confirmAjouterPizza(pizzaDialog);
    });
  }

  confirmAjouterPizza(pizzaToAdd) {
    this.spinnerService.show('loader');
    this.pizzaService.post(pizzaToAdd).subscribe(pizzaAdded => {
      this.spinnerService.hide('loader');
      this.pizzaCurrent = null;
      this.toastr.success("Pizza correctement créée !", "Ajout");
      this.pizzaService.refresh();
      location.reload();
    }, error => {
      this.toastr.error("Erreur dans l'ajout de la pizza...", "Erreur");
      this.errorMessage = <any>error
    });
  }
  /* Fin Ajouter */

  /* Début Editer */
  openEditerPizzaDialog(id): void {
    this.spinnerService.show('loader');
    this.pizzaService.getById(id).subscribe(pizza => {
      this.spinnerService.hide('loader');
      this.pizzaBefore = JSON.stringify(pizza);
      let dialogRef = this.dialog.open(EditerPizzaDialogComponent, {
        width: '350px'
      });

      dialogRef.componentInstance.pizza = pizza;
      dialogRef.componentInstance.dialogReference = dialogRef;
      dialogRef.componentInstance.confirmUpdatePizza.subscribe(pizzaDialog => {
        this.confirmEditerPizza(pizzaDialog);
      });
    }, error => {
      this.toastr.error("Erreur dans la récupération de la pizza...", "Erreur");
      this.errorMessage = <any>error;
    });
  }

  confirmEditerPizza(pizzaToUpdate) {
    if(!_.isEqual(pizzaToUpdate, JSON.parse(this.pizzaBefore))){
      let pizzaGoingToBeUpdate = this.functionService.getDiff(JSON.parse(this.pizzaBefore), pizzaToUpdate);
      this.spinnerService.show('loader');
      this.pizzaService.update(pizzaGoingToBeUpdate).subscribe(pizzaUpdated => {
        this.toastr.success("Pizza correctement mise à jour !", "Maj");
        this.spinnerService.hide('loader');
        this.pizzaService.refresh();
        this.pizzaCurrent = null;
        location.reload();
      }, error => {
        this.toastr.error("Erreur dans la modification de la pizza...", "Erreur");
        this.errorMessage = <any>error
      });
    } else {
      console.log("La pizza n'a pas changée");
    }
  }
  /* Fin Editer */

  /* Début Suppression */
  openSupprimerPizzaDialog(id): void {
    this.spinnerService.show('loader');
    this.pizzaService.getById(id).subscribe(pizza => {
      this.spinnerService.hide('loader');
      this.pizzaCurrent = Object.assign({}, pizza);
      let dialogRef = this.dialog.open(SupprimerPizzaDialogComponent, {
        width: '450px'
      });

      dialogRef.componentInstance.pizza = pizza;
      dialogRef.componentInstance.dialogReference = dialogRef;
      dialogRef.componentInstance.confirmDeletePizza.subscribe(() => {
        this.confirmSuppressionPizza(this.pizzaCurrent);
      });
    }, error => {
      this.toastr.error("Erreur dans la récupération de la pizza...", "Erreur");
      this.errorMessage = <any>error
    });
  }

  confirmSuppressionPizza(pizzaToDelete) {
    this.spinnerService.show('loader');
    this.pizzaService.delete(pizzaToDelete._id).subscribe(() => {
      this.spinnerService.hide('loader');
      this.pizzaService.refresh();
      /*
      Update local ne marche pas...

      let pizzaaa = this.pizzas.find(pizzaListe => pizzaListe._id == pizzaToDelete._id);
      let indexOfPizza = this.pizzas.indexOf(pizzaaa);
      console.log(indexOfPizza)
      if (indexOfPizza !== -1) {
        this.pizzas.splice(indexOfPizza, 1);
      }*/
      this.pizzaCurrent = null;
      this.toastr.success("Pizza correctement supprimée", "Suppression");
      location.reload();
    }, error => {
      this.toastr.error("Erreur dans la suppression de la pizza...", "Erreur");
      this.errorMessage = <any>error
    });
  }
  /* Fin Suppression */

}
