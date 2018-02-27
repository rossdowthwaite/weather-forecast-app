import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { ForecastComponent } from './forecast.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ForecastItemComponent } from './forecast-item/forecast-item.component';
import { ForecastInputComponent } from './forecast-input/forecast-input.component';
import { ForecastTimeComponent } from './forecast-time/forecast-time.component';
import { ForecastLoadingComponent } from './forecast-loading/forecast-loading.component';
import { ForecastItemTempComponent } from './forecast-item-temp/forecast-item-temp.component';
import { Forecast, ForecastModel } from '../../interfaces/forecast';
import { Forecasts, ForecastsModel } from '../../interfaces/forecasts';
import { FormsModule } from '@angular/forms';
import { UnixToDatePipe } from '../../pipes/unix-to-date.pipe';
import { UnixToTimePipe } from '../../pipes/unix-to-time.pipe';
import { CelciusPipe } from '../../pipes/celcius.pipe';
import { ForecastService } from '../../services/forecast.service';
import { Times } from '../../interfaces/times';

fdescribe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForecastListComponent,
        ForecastComponent,
        ForecastItemComponent,
        ForecastInputComponent,
        ForecastTimeComponent,
        ForecastLoadingComponent,
        ForecastItemTempComponent,
        UnixToDatePipe,
        UnixToTimePipe,
        CelciusPipe,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        ForecastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    component.forecasts$ = Observable.of(ForecastsModel.generateMockForecasts());
    component.times$ = Observable.of(Times.generateMockTimes());
    component.fetching$ = Observable.of(false);
    component.error$ = Observable.of('');
    component.count$ = Observable.of(3);
    component.currentTime$ = Observable.of(1519668000);
    component.timesCheck$ = Observable.of();
    component.title = 'City Forcast test';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('forecast should be out of date', () => {
    const forecast = ForecastModel.generateMockForecast();
    expect( component.forecastIsOutOfDate(forecast, 0, 2)).toEqual(true);
  });
});
