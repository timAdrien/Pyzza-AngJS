import {Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {
  MatDialogRef, MAT_DIALOG_DATA, MAT_PLACEHOLDER_GLOBAL_OPTIONS
} from '@angular/material';

import {Pizza} from '../../model/pizza';
import {Ingredient} from "../../model/ingredient";
import {FormControl} from "@angular/forms";
import {IngredientService} from "../../service/ingredient.service";

@Component({
  selector: 'app-ajouter-pizza-dialog',
  templateUrl: './ajouter-pizza-dialog.component.html',
  styleUrls: ['./ajouter-pizza-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'always'} }
  ]
})
export class AjouterPizzaDialogComponent implements OnInit {

  @Output() confirmPostPizza: EventEmitter<Pizza> = new EventEmitter<Pizza>();
  pizza: Pizza;
  dialogReference: MatDialogRef<AjouterPizzaDialogComponent>;
  selectedIngredients: string[];
  ingredients: Ingredient[];
  toppings = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AjouterPizzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ingredientService: IngredientService) { }

  closeDialog(): void {
    this.dialogReference.close();
  }

  ngOnInit() {
    this.selectedIngredients = [];
    this.getIngredients();
  }

  onGetPhoto(imgBase64) {
    let photoBase64 = JSON.parse(imgBase64);
    this.pizza.photo = { data: photoBase64.data, contentType: photoBase64.contentType };
  }

  confirmAjouterPizza() {
    let pizza = this.pizza;
    if( pizza.ingredient_ids == undefined){
      pizza.ingredient_ids = [];
    }

    this.selectedIngredients.forEach(function (ingredientId) {
      pizza.ingredient_ids.push({_id: ingredientId, nom: '', poids: 0, prix: 0});
    });
    pizza.ingredient_ids = pizza.ingredient_ids.filter(ing => ing.nom == '');


    let ingredients = this.ingredients;
    if( this.ingredients != undefined){
      pizza.ingredient_ids.forEach(function (ingredient) {
        pizza.ingredient_ids[pizza.ingredient_ids.indexOf(ingredient)]
          = ingredients.find(ing => ing._id == ingredient._id);
      });
    }

    this.confirmPostPizza.emit(this.pizza);
    this.closeDialog();
  }


  getIngredients() {
    this.ingredientService.getAll().subscribe(ingredients => {
      this.ingredients = ingredients;
      this.setSelectedValues();
    }, error => {
      console.log(error);
    });
  }

  setSelectedValues() {
    let pizza = this.pizza;
    let selectedIngredients = this.selectedIngredients;
    if( pizza.ingredient_ids == undefined){
      pizza.ingredient_ids = [];
    }
    this.ingredients.forEach(function (ingredient) {
      if (pizza.ingredient_ids.find(ing => ing._id == ingredient._id)) {
        selectedIngredients.push(ingredient._id);
      }
    });

  }
}

