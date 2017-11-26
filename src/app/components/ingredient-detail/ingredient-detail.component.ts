import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FunctionService} from "../../service/function.service";
import {ToastsManager} from "ng2-toastr";
import {SpinnerService} from "../../service/spinner.service";
import {IngredientService} from "../../service/ingredient.service";
import {MatDialog} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from '../../model/ingredient';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IngredientDetailComponent implements OnInit {

  ingredientForm: FormGroup;
  ingredientCurrent: Ingredient;
  edition: boolean;
  errorMessage: any;

  constructor(  private ingredientService: IngredientService,
                public dialog: MatDialog,
                private spinnerService: SpinnerService,
                private toastr: ToastsManager,
                private _vcr: ViewContainerRef,
                private functionService: FunctionService,
                private route: ActivatedRoute,
                private router: Router
  ) {
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.edition = false;
    this.ingredientForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      prix: new FormControl('', [Validators.required]),
      poids: new FormControl('', [Validators.required])
    });
    this.ingredientCurrent = new Ingredient();

    let idRoute = this.route.snapshot.paramMap.get('id');

    if (idRoute) {
      this.edition = true;
      this.ingredientCurrent._id = idRoute;
      this.spinnerService.show('loader');
      this.ingredientService.getById(idRoute).subscribe(ingredient => {
        this.spinnerService.hide('loader');
        this.ingredientForm.patchValue(ingredient);
        this.ingredientCurrent = ingredient;
      }, error => {
        this.toastr.error("Erreur dans la récupération de l'ingredient...", "Erreur");
        this.errorMessage = <any>error
      });
    }
  }

  /* Début */
  onSubmit() {
    let ingredientFromForm = this.prepareSaveIngredient();
    if (!this.edition) {
      this.spinnerService.show('loader');
      this.ingredientService.post(ingredientFromForm).subscribe(ingredientAdded => {
        this.spinnerService.hide('loader');
        this.ingredientService.refresh();
        this.ingredientCurrent = null;
        this.router.navigate(['/ingredient/liste']);
      }, error => {
        this.toastr.error("Erreur dans l'ajout de la Ingredient...", "Erreur");
        this.errorMessage = <any>error
      });
    } else {
      if(!_.isEqual(ingredientFromForm, this.ingredientCurrent)){
        let IngredientGoingToBeUpdate = this.functionService.getDiff(this.ingredientCurrent, ingredientFromForm);
        this.spinnerService.show('loader');
        this.ingredientService.update(IngredientGoingToBeUpdate).subscribe(ingredientUpdated => {
          this.spinnerService.hide('loader');
          this.ingredientService.refresh();
          this.ingredientCurrent = null;
          this.router.navigate(['/ingredient/liste']);
        }, error => {
          this.toastr.error("Erreur dans la modification de la Ingredient...", "Erreur");
          this.errorMessage = <any>error
        });
      } else {
        console.log("La Ingredient n'a pas changée");
      }
    }
  }
  /* Fin */

  prepareSaveIngredient(): Ingredient {
    const formModel = this.ingredientForm.value;

    let id: string;

    id = this.ingredientCurrent._id ? this.ingredientCurrent._id : null;

    const saveIngredient: Ingredient = {
      _id: id,
      nom: formModel.nom as string,
      prix: formModel.prix as number,
      poids: formModel.poids as number,
    };

    return saveIngredient;
  }
}
