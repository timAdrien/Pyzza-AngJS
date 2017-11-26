import { Injectable } from '@angular/core';
import {SpinnerComponent} from "../components/spinner-loader/spinner-loader.component";

@Injectable()
export class SpinnerService {

  private spinnerCache = new Set<SpinnerComponent>();
  constructor() { }


  register(spinner: SpinnerComponent): void {
    this.spinnerCache.add(spinner);
  }

  unregister(spinnerToRemove: SpinnerComponent): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner === spinnerToRemove) {
        this.spinnerCache.delete(spinner);
      }
    });
  }

  show(spinnerNom: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.name === spinnerNom) {
        spinner.isLoading = true;
      }
    });
  }

  hide(spinnerNom: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.name === spinnerNom) {
        spinner.isLoading = false;
      }
    });
  }
}
