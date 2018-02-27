import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { ForecastData } from '../../../interfaces/forecast-data';

@Component({
  selector: 'app-forecast-item-temp',
  templateUrl: './forecast-item-temp.component.html',
  styleUrls: ['./forecast-item-temp.component.css']
})
export class ForecastItemTempComponent implements OnInit {

  @Input() forecast: ForecastData;
  @Input() showMore: boolean;

  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;

  constructor() { }

  ngOnInit() {
    this.temp = this.forecast.temp;
    this.temp_min = this.forecast.temp_min;
    this.temp_max = this.forecast.temp_max;
    this.description = this.forecast.description;
  }
}
