import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastItemComponent } from './forecast-item.component';
import { ForecastItemTempComponent } from '../forecast-item-temp/forecast-item-temp.component';
import { CelciusPipe } from '../../../pipes/celcius.pipe';
import { Forecast, ForecastModel } from '../../../interfaces/forecast';

describe('ForecastItemComponent', () => {
  let component: ForecastItemComponent;
  let fixture: ComponentFixture<ForecastItemComponent>;
  let showMoreElement: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForecastItemComponent,
        ForecastItemTempComponent,
        CelciusPipe
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastItemComponent);
    component = fixture.componentInstance;
    component.forecast = ForecastModel.generateMockForecast();
    showMoreElement = fixture.nativeElement.querySelector('p.show-more');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise with the correct data', () => {
    expect(component.name).toEqual('Brighton');
    expect(component.country).toEqual('GB');
    expect(component.forecastData.length).toEqual(9);
  });

  it('should switch showMore to true when toggleShowHide called', () => {
    component.toggleShowHide();
    fixture.detectChanges();
    expect(component.showMore).toEqual(true);
  });

  it('should switch showMore to false when toggleShowHide called * twice', () => {
    component.toggleShowHide();
    component.toggleShowHide();
    fixture.detectChanges();
    expect(component.showMore).toEqual(false);
  });

  it('should switch showMore to true when "Show more" clicked', () => {
    showMoreElement.click();
    fixture.detectChanges();
    expect(component.showMore).toEqual(true);
  });

  it('should switch showMore to False when "Show more" clicked twice', () => {
    showMoreElement.click();
    showMoreElement.click();
    fixture.detectChanges();
    expect(component.showMore).toEqual(false);
  });

  it('should emit a forecast with correct data', () => {
    let forecast: Forecast;
    component.removeForecastData.subscribe((f) => forecast = f);
    component.removeForecast();
    fixture.detectChanges();

    expect(forecast.name).toBe('Brighton');
    expect(forecast.country).toBe('GB');
  });

});
