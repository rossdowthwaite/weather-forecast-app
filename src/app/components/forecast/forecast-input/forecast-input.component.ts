import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { Forecast } from '../../../interfaces/forecast';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-forecast-input',
  templateUrl: './forecast-input.component.html',
  styleUrls: ['./forecast-input.component.css']
})
export class ForecastInputComponent implements OnInit {

  @Output() getCityData = new EventEmitter<string>();
  @Input() forecasts: Forecast[];

  city: string;

  constructor() {}

  ngOnInit() {
    this.city = '';
  }


  invalidEntry() {
    return this.city === '' || this.forecasts.filter( (f) => f.name === this.city ).length;
  }

  onSubmit() {
    this.getCityData.emit(this.city);
    this.city = '';
  }
}
