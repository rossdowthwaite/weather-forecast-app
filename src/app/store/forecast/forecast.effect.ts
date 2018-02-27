import { Effect, Actions } from '@ngrx/effects';
import { exhaustMap, takeUntil, tap, switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import * as fromRoot from '../../store/forecast/forecast.reducer';
import * as forecastActions from '../../store/forecast/forecast.action';
import { ForecastService } from '../../services/forecast.service';

@Injectable()
export class ForecastEffects {

  @Effect()
    addForecastEffect$ = this.actions$
      .ofType(forecastActions.ADD_FORECAST)
      .mergeMap( action =>
        this.forecastService.getForecast$(action['payload'])
           .map(city => ({type: forecastActions.ADD_FORECAST_SUCCESS, payload: city}))
           .catch(() => Observable.of({type: forecastActions.ADD_FORECAST_FAIL}))
    );

    @Effect()
      addForecastSuccessEffect$ = this.actions$
        .ofType(forecastActions.ADD_FORECAST_SUCCESS)
        .withLatestFrom(this.store.select(fromRoot.getCurrentTime))
        .map( ([ action, currentTime ]) => {
          const newTime = action['payload'].data[0].time;
          if ( newTime !== currentTime ) {
            return {type: forecastActions.OUT_OF_DATE };
          } else {
            return {type: forecastActions.UP_TO_DATE };
          }
        });

    @Effect()
      updateTimesEffect$ = this.actions$
        .ofType(forecastActions.OUT_OF_DATE)
        .map( (state) => {
            return {type: forecastActions.ADD_TIMES };
          }
        );

    // Updated times done
    @Effect()
      addTimesSuccessEffect$ = this.actions$
        .ofType(forecastActions.ADD_TIMES)
        .map( (state) => {
            return {type: forecastActions.ADD_TIMES_DONE};
          }
        );

    @Effect()
      updateForecastEffect$ = this.actions$
        .ofType(forecastActions.UPDATE_FORECAST)
        .mergeMap( action =>
          this.forecastService.getForecast$(action['payload'])
             .map(city => ({type: forecastActions.UPDATE_FORECAST_SUCCESS, payload: city}))
             .catch(() => Observable.of({type: forecastActions.UPDATE_FORECAST_FAIL}))
      );

    // Updated times success
    @Effect()
      updateForecastsSuccessEffect$ = this.actions$
        .ofType(forecastActions.UPDATE_FORECAST_SUCCESS)
        .map( (state) => {
            return {type: forecastActions.UP_TO_DATE };
          }
        );


  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppStates>,
    private forecastService: ForecastService
  ) { }
}
