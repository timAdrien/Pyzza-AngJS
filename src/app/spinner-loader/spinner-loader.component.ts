import {Component, EventEmitter, Injectable, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SpinnerService} from '../service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.css'],
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() isLoading: boolean;
  @Output() showChange = new EventEmitter();

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.name = 'loader';
    this.spinnerService.register(this);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.spinnerService.unregister(this);
  }
}
