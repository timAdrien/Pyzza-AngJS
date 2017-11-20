import {Component, Inject, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';

import {
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material';


import {Pizza} from '../model/pizza';


@Component({
  selector: 'app-supprimer-pizza-dialog',
  templateUrl: './supprimer-pizza-dialog.component.html',
  styleUrls: ['./supprimer-pizza-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class SupprimerPizzaDialogComponent implements OnInit {

  @Output() confirmDeletePizza: EventEmitter<Pizza> = new EventEmitter<Pizza>();
  pizza: Pizza;
  dialogReference: MatDialogRef<SupprimerPizzaDialogComponent>;

  constructor(
    public dialogRef: MatDialogRef<SupprimerPizzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
    this.dialogReference.close();
  }

  ngOnInit() {
  }

  confirmSupprimerPizza() {
    this.confirmDeletePizza.emit();
    this.closeDialog();
  }
}

