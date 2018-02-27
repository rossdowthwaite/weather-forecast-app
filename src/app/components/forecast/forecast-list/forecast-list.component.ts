import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Rx';

import { Forecast } from '../../../interfaces/forecast';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.css'],
})
export class ForecastListComponent {

  @Input() forecasts: Observable<Forecast[]>;
  @Output() removeForecast = new EventEmitter<any>();

  constructor() {}

  removeCityData(forecast: Forecast) {
    this.removeForecast.emit(forecast);
  }
}
