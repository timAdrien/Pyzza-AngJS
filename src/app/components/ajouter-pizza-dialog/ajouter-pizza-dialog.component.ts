import {Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {
  MatDialogRef, MAT_DIALOG_DATA, MAT_PLACEHOLDER_GLOBAL_OPTIONS
} from '@angular/material';

import {Pizza} from '../../model/pizza';

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

  constructor(
    public dialogRef: MatDialogRef<AjouterPizzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
    this.dialogReference.close();
  }

  ngOnInit() {
  }

  onGetPhoto(imgBase64) {
    let photoBase64 = JSON.parse(imgBase64);
    this.pizza.photo = { data: photoBase64.data, contentType: photoBase64.contentType };
  }

  confirmAjouterPizza() {
    this.confirmPostPizza.emit(this.pizza);
    this.closeDialog();
  }
}

