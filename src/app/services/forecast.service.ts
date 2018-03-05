import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, filter } from 'rxjs/operators';

import { Forecast } from '../interfaces/forecast';
import { ForecastData } from '../interfaces/forecast-data';
import { environment } from '../../environments/environment';

@Injectable()
export class ForecastService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  // Get city forecast
  getForecast$( city: string ): Observable<any> {
    const request = `${ environment.apiUrl }${ city }`;

    const params = new HttpParams()
      .set('units', 'metric')
      .set('mode', 'json')
      .set('APPID', environment.apiKey );

    return this.http.get(request, {params})
      .map(toForecast)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return new ErrorObservable (
      'Something bad happened; please try again later.');
  }
}

/**
* Convert the response to type Forecast
**/
function toForecast( response: Response ): Forecast {
  const cityForecast = <Forecast>({
    id: response['city'].id,
    name: response['city'].name,
    country: response['city'].country,
    data: response['list']
            .map(toForecastPeriod)
            .filter( (data, i) => i < 9)
  });
  return cityForecast;
}

/**
* Convert the weather data to type ForecastPeriod
**/
function toForecastPeriod( data: object, index: number ): ForecastData {
    return <ForecastData>({
      time: data['dt'],
      temp: data['main'].temp,
      temp_min:  data['main'].temp_min,
      temp_max:  data['main'].temp_max,
      description: data['weather'][0].description,
    });
}
