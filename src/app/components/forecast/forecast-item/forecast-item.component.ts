import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Forecast } from '../../../interfaces/forecast';
import { ForecastData } from '../../../interfaces/forecast-data';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.css'],
})
export class ForecastItemComponent implements OnInit {

  @Input() forecast: Forecast;
  @Output() removeForecastData = new EventEmitter<any>();

  name: string;
  country: string;
  forecastData: ForecastData[];
  showMore: boolean;

  constructor() {}

  ngOnInit() {
    this.name = this.forecast.name;
    this.country = this.forecast.country;
    this.forecastData = this.forecast.data;
    this.showMore = false;
    console.log(this.forecastData);
  }

  removeForecast() {
    this.removeForecastData.emit(this.forecast);
  }

  toggleShowHide() {
    this.showMore = !this.showMore;
  }
}
