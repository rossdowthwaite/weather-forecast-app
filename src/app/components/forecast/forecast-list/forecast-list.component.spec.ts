import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ForecastListComponent } from './forecast-list.component';
import { ForecastComponent } from './../forecast.component';
import { ForecastItemComponent } from './../forecast-item/forecast-item.component';
import { ForecastInputComponent } from './../forecast-input/forecast-input.component';
import { ForecastTimeComponent } from './../forecast-time/forecast-time.component';
import { ForecastLoadingComponent } from './../forecast-loading/forecast-loading.component';
import { ForecastItemTempComponent } from './../forecast-item-temp/forecast-item-temp.component';
import { Forecast, ForecastModel } from '../../../interfaces/forecast';
import { Forecasts, ForecastsModel } from '../../../interfaces/forecasts';
import { FormsModule } from '@angular/forms';
import { UnixToDatePipe } from '../../../pipes/unix-to-date.pipe';
import { UnixToTimePipe } from '../../../pipes/unix-to-time.pipe';
import { CelciusPipe } from '../../../pipes/celcius.pipe';

describe('ForecastListComponent', () => {
  let component: ForecastListComponent;
  let fixture: ComponentFixture<ForecastListComponent>;

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
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastListComponent);
    component = fixture.componentInstance;
    component.forecasts = Observable.of(ForecastsModel.generateMockForecasts());
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a forecast with correct data', () => {
    const mockForecast: Forecast = ForecastModel.generateMockForecast();
    let forecastEnd: Forecast;

    component.removeForecast.subscribe((f) => forecastEnd = f);
    component.removeCityData(mockForecast);
    fixture.detectChanges();

    expect(forecastEnd.name).toBe('Brighton');
    expect(forecastEnd.country).toBe('GB');
  });

  it('should get forecasts with correct data', () => {
    expect(component.forecasts['value'][0].name).toBe('Brighton');
    expect(component.forecasts['value'][0].country).toBe('GB');
    expect(component.forecasts['value'][0].data.length).toBe(9);
  });
});
