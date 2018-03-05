import { TestBed, inject, async } from '@angular/core/testing';
import { ForecastService } from './forecast.service';

import { MockApiData } from '../models/mock-api-data';
import { ForecastModel } from '../interfaces/forecast';
import { environment } from '../../environments/environment';

import { HttpClientModule,  HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('ForecastService', () => {
  const city = 'Brighton';
  const paramOne = '&units=metric';
  const paramTwo = '&mode=json';
  const appid = `&APPID=${environment.apiKey}`;
  const url = `${environment.apiUrl}${city}${paramOne}${paramTwo}${appid}`;
  const mockResponse = MockApiData.createMockData();
  const mockForecastData = ForecastModel.generateMockForecast();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ForecastService
      ]
    });
  }));

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([ForecastService], (service: ForecastService) => {
    expect(service).toBeTruthy();
  }));

  it('should issue a request',
    async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get('/foo/bar').subscribe();
        backend.expectOne({
          url: '/foo/bar',
          method: 'GET'
        });
      })
    )
  );

  it(`should emit 'true' for 200 Ok`, async(inject([ForecastService, HttpTestingController],
  (service: ForecastService, backend: HttpTestingController) => {
    service.getForecast$('Brighton').subscribe((next) => {
      expect(next).toBeTruthy();
    });
    backend.expectOne(url).flush(mockResponse, { status: 200, statusText: 'Ok' });
  })));


  it('should return the correct values', async(inject([ForecastService, HttpTestingController],
  (service: ForecastService, backend: HttpTestingController) => {
    service.getForecast$('Brighton').subscribe((next) => {
      expect(next.name).toBe('Brighton');
      expect(next.country).toBe('GB');
      expect(next.data.length).toBe(9);
      expect(next.data[0].time).toBe(1519668000);
      expect(next.data[5].time).toBe(1519722000);
    });
    backend.expectOne(url).flush(mockResponse, { status: 200, statusText: 'Ok' });
  })));
});
