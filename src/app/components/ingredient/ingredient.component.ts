import {Component, OnInit, ViewEncapsulation, ViewContainerRef, Output} from '@angular/core';
import {Ingredient} from "../../model/ingredient";
import {IngredientService} from "../../service/ingredient.service";
import {MatDialog} from "@angular/material";
import {SpinnerService} from "../../service/spinner.service";
import {ToastsManager} from "ng2-toastr";
import {FunctionService} from '../../service/function.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IngredientComponent implements OnInit {


  ingredients: Ingredient[];
  errorMessage: any;

  constructor(  private ingredientService: IngredientService,
                public dialog: MatDialog,
                private spinnerService: SpinnerService,
                private toastr: ToastsManager,
                private _vcr: ViewContainerRef,
                private functionService: FunctionService
  ) {
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.getIngredients();
    this.ingredientService.onRefresh().subscribe(() => {
      this.getIngredients();
      this.toastr.warning("Une ingredient a été mise à jour...", "Maj d'un ingredient");
    }, error => {
      this.toastr.error("Erreur de mise à jour des Ingredients...", "Erreur");
      this.errorMessage = <any>error;
    });
  }

  /* Début Appels Services */
  getIngredients(): void {
    this.spinnerService.show('loader');
    this.ingredientService.getAll().subscribe(Ingredients => {
      this.spinnerService.hide('loader');
      this.ingredients = Ingredients;
    }, error => {
      this.toastr.error("Erreur de chargement des ingredients...", "Erreur", {dismiss: 'controlled'});
      this.errorMessage = <any>error;
    });
  }
  /* Fin Appels Services */


  /* Début Suppression */
  confirmSupprimerIngredient(IngredientToDelete) {
    this.spinnerService.show('loader');
    this.ingredientService.delete(IngredientToDelete._id).subscribe(() => {
      this.spinnerService.hide('loader');
      this.ingredientService.refresh();
      let indexIngredient = this.ingredients.findIndex(IngredientListe => IngredientListe._id == IngredientToDelete._id);
      if (indexIngredient !== -1) {
        this.ingredients.splice(indexIngredient, 1);
      }
      this.toastr.success("Ingredient correctement supprimée", "Suppression");
    }, error => {
      this.toastr.error("Erreur dans la suppression de l'ingredient...", "Erreur",{dismiss: 'controlled'});
      this.errorMessage = <any>error
    });
  }
  /* Fin Suppression */
}
