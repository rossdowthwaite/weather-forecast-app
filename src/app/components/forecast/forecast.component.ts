import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { ForecastService } from '../../services/forecast.service';
import { Forecast } from '../../interfaces/forecast';

import * as fromRoot from '../../store/forecast/forecast.reducer';
import * as forecastActions from '../../store/forecast/forecast.action';
import * as moment from 'moment';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnInit {
  forecastService: ForecastService;

  forecasts$: Observable<Forecast[]>;
  times$: Observable<number[]>;
  fetching$: Observable<boolean>;
  error$: Observable<string>;
  count$: Observable<number>;
  upToDate$: Observable<boolean>;
  currentTime$: Observable<number>;
  timesCheck$: Observable<any>;
  upToDateCheck$: Observable<any>;
  cityUpToDate$: Observable<any>;
  checkUpdates$: Observable<any>;

  title: String = 'City Forecast';
  forecasts: Forecast[];

  constructor(
    forecastService: ForecastService,
    public store: Store<fromRoot.AppStates>
  ) {
    this.forecastService = forecastService;

    this.forecasts$ = this.store.select(fromRoot.getForecasts);
    this.times$ = this.store.select(fromRoot.getTimes);
    this.fetching$ = this.store.select(fromRoot.getFecthingStatus);
    this.error$ = this.store.select(fromRoot.getError);
    this.count$ = this.store.select(fromRoot.getCount);
    this.currentTime$ = this.store.select(fromRoot.getCurrentTime);
    this.timesCheck$ = Observable.combineLatest(this.count$, this.times$);
  }

  ngOnInit() {

    this.forecasts$.subscribe((forecasts) => {
      this.forecasts = forecasts;
    });

    // When the time updates, update existing forecastss
    this.currentTime$
      .withLatestFrom( this.forecasts$ )
      .withLatestFrom( this.count$ )
      .map( ([[currentTime, forecasts], count]) => this.filterOutOfDate)
      .subscribe( (thing) => {
        console.log('Forecasts updated');
      });

    // Clear times if no forecasts
    this.timesCheck$.subscribe( ([count, times]) => {
      if (count === 0 && times.lenth ) {
        this.clearTimes();
      }
    });
  }

  // Get the forecast data
  getForecast(city: string): void {
    this.store.dispatch( new forecastActions.AddForecastAction(city) );
  }

  // Remove forecast data
  removeForecast(city: Forecast): void {
    this.store.dispatch( new forecastActions.RemoveForecastAction(city) );
  }

  // Update forecast data
  updateForecast(city: string): void {
    this.store.dispatch( new forecastActions.UpdateForecastAction(city) );
  }

  forecastIsOutOfDate( city: Forecast, currentTime: number, count: number ): boolean {
    return city.data[0].time !== currentTime && count > 1;
  }

  clearTimes(): void {
    this.store.dispatch( new forecastActions.ClearTimesAction() );
  }

  filterOutOfDate(forecasts, currentTime, count) {
    forecasts.filter( (forecast) => {
      return this.forecastIsOutOfDate(forecast, currentTime, count);
    })
    .map( (forecast) => {
      // Perform updates on forecast
      this.updateForecast(forecast.name);
    });
  }

}
