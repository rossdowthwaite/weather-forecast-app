import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CelciusPipe } from '../../../pipes/celcius.pipe';

import { ForecastItemTempComponent } from './forecast-item-temp.component';
import { ForecastData, ForecastDataModel } from '../../../interfaces/forecast-data';

describe('ForecastItemTempComponent', () => {
  let component: ForecastItemTempComponent;
  let fixture: ComponentFixture<ForecastItemTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForecastItemTempComponent,
        CelciusPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastItemTempComponent);
    component = fixture.componentInstance;
    component.forecast = ForecastDataModel.generateMockForecastData(1);
    component.showMore = false;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init with the correct data', () => {
    expect(component.temp).toEqual(3);
    expect(component.temp_min).toEqual(-1);
    expect(component.temp_max).toEqual(4);
    expect(component.description).toEqual('Cold');
  });
});
