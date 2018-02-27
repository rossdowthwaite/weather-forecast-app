import { Times } from './times';

export interface ForecastData {
  time: number;
  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export class ForecastDataModel implements ForecastData {
  time: number;
  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;

  constructor() {
    this.time = 0;
    this.temp = 0;
    this.temp_min = 0;
    this.temp_max = 0;
    this.description = '';
  }

  static generateMockForecastData(index: number): ForecastDataModel {
    const times = Times.generateMockTimes();
    return {
      time: times[index],
      temp: 3,
      temp_min: -1,
      temp_max: 4,
      description: 'Cold',
    };
  }

  static generateMockForecastDataset(): ForecastDataModel[] {
    const dataModel: ForecastDataModel[] = [];
    while ( dataModel.length < 9 ) {
      dataModel.push(this.generateMockForecastData(dataModel.length));
    }
    return dataModel;
  }
}
