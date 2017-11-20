import {Component, Inject, OnInit, ViewEncapsulation, Output, Input, EventEmitter} from '@angular/core';

import {
  MatDialogRef, MAT_DIALOG_DATA, MAT_PLACEHOLDER_GLOBAL_OPTIONS
} from '@angular/material';

import {Pizza} from '../model/pizza';

@Component({
  selector: 'app-editer-pizza-dialog',
  templateUrl: './editer-pizza-dialog.component.html',
  styleUrls: ['./editer-pizza-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'always'} }
  ]
})
export class EditerPizzaDialogComponent implements OnInit {

  @Output() confirmUpdatePizza: EventEmitter<Pizza> = new EventEmitter<Pizza>();
  pizza: Pizza;
  dialogReference: MatDialogRef<EditerPizzaDialogComponent>;

  constructor(
    public dialogRef: MatDialogRef<EditerPizzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
    this.dialogReference.close();
  }

  ngOnInit() {}

  confirmEditerPizza() {
    this.confirmUpdatePizza.emit(this.pizza);
    this.closeDialog();
  }
}

