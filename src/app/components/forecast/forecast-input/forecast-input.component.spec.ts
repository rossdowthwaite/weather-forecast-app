import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ForecastInputComponent } from './forecast-input.component';
import { Forecast, ForecastModel } from '../../../interfaces/forecast';

describe('ForecastInputComponent', () => {
  let component: ForecastInputComponent;
  let fixture: ComponentFixture<ForecastInputComponent>;
  let inputEl: HTMLInputElement;
  let submitEl: DebugElement;
  let mockForecast: Forecast;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastInputComponent ],
      imports: [
        FormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastInputComponent);
    component = fixture.componentInstance;

    inputEl = fixture.nativeElement.querySelector('input[name="city"]');
    submitEl = fixture.debugElement.query(By.css('button'));

    mockForecast = ForecastModel.generateMockForecast();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the text input', () => {
    component.city = 'test input';
    component.onSubmit();
    fixture.detectChanges();
    expect(component.city).toEqual('');
  });

  it('should disable button if no forecasts and text input is empty', () => {
    component.city = '';
    component.forecasts = [];
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('should disable button if forecasts name contains same as input', () => {
    component.city = 'Brighton';
    component.forecasts = [mockForecast];
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('should enable button if no forecasts but text input has content', () => {
    component.city = 'test City';
    component.forecasts = [];
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

  it('should enable button if forecasts and text input has different name content', () => {
    component.city = 'London';
    component.forecasts = [mockForecast];
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

  it('Entering city emits getCityData event', () => {
    let city: string;
    component.city = 'Brighton';
    component.getCityData.subscribe((value) => city = value);
    component.onSubmit();
    fixture.detectChanges();
    expect(city).toBe('Brighton');
  });
});
