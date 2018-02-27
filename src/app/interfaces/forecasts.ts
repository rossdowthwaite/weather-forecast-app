import { Forecast, ForecastModel } from './forecast';

export interface Forecasts {
  forecasts: Forecast[];
}

export class ForecastsModel implements Forecasts {
  forecasts: Forecast[];

  constructor() {
    this.forecasts = [];
  }

  static generateMockForecasts() {
    return ForecastModel.generateMockForecasts();
  }
}
