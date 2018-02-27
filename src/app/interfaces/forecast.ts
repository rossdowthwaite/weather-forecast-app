import { ForecastData, ForecastDataModel } from './forecast-data';

export interface Forecast {
  name: string;
  country: string;
  data: ForecastData[];
}

export class ForecastModel implements Forecast {
  id: number;
  name: string;
  country: string;
  data: ForecastData[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.country = '';
    this.data = [];
  }

  static generateMockForecast(index: number = 0): ForecastModel {
    return {
      id: index,
      name: 'Brighton',
      country: 'GB',
      data: ForecastDataModel.generateMockForecastDataset(),
    };
  }

  static generateMockForecasts(): Forecast[] {
    const mockForecasts = [];
    while ( mockForecasts.length < 3 ) {
      mockForecasts.push(this.generateMockForecast(mockForecasts.length));
    }
    return mockForecasts;
  }
}
