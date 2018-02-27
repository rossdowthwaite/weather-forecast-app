import * as forecasts from './forecast.action';
import { Store, ActionReducerMap } from '@ngrx/store';

import { Forecast } from '../../interfaces/forecast';

export interface AppStates {
  forecastsState: State;
}

export interface State {
  isFetching: boolean;
  error: string;
  upToDate: boolean;
  times: number[];
  currentTime: number;
  updatingTimes: boolean;
  forecasts: Forecast[];
  updatingForecasts: boolean;
  count: number;
}

const initialState: State = {
  isFetching: false,
  error: '',
  currentTime: 0,
  upToDate: false,
  updatingTimes: false,
  updatingForecasts: false,
  times: [],
  count: 0,
  forecasts: [],
};

export const forecastReducers: ActionReducerMap<AppStates> = {
  forecastsState: forecastReducer
};

export function forecastReducer(state = initialState, action: forecasts.Actions): State {
  switch (action.type) {
    case forecasts.ADD_FORECAST: {
      return {
        ...state,
        error: '',
        isFetching: true,
      };
    }

    case forecasts.ADD_FORECAST_SUCCESS: {
      const city = action.payload;

      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        count: state.count += 1,
        forecasts: [...state.forecasts, city]
      });
    }

    case forecasts.ADD_FORECAST_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: 'Error adding forecast'
      };
    }

    case forecasts.UPDATE_FORECAST: {
      return {
        ...state,
        updatingForecasts: true,
      };
    }

    case forecasts.UPDATE_FORECAST_SUCCESS: {
      const city = action.payload;
      const index = state.forecasts.findIndex(forecast => forecast.name === city.name);
      const newForecastState: Forecast[] = [...state.forecasts];
      newForecastState[index] = city;

      return {
        ...state,
        updatingForecasts: true,
        forecasts: newForecastState
      };
    }

    case forecasts.UPDATE_FORECAST_FAIL: {
      return {
        ...state,
        updatingForecasts: false,
        error: 'Failed to update forescasts'
      };
    }

    case forecasts.REMOVE_FORECAST: {
      const city = action.payload;
      const newForcasts = state.forecasts.filter( (forecast: Forecast) => {
        return forecast !== city;
      });

      return {
        ...state,
        count: state.count -= 1,
        forecasts: newForcasts
      };
    }

    case forecasts.ADD_TIMES: {
      const city = state.forecasts[state.forecasts.length - 1];

      return {
        ...state,
        currentTime: city.data[0].time,
        updatingTimes: true,
        times: city.data.map( item => item.time )
      };
    }

    case forecasts.ADD_TIMES_DONE: {
      return {
        ...state,
        updatingTimes: false,
      };
    }

    case forecasts.CLEAR_TIMES: {
      return{
        ...state,
        currentTime: 0,
        upToDate: false,
        times: []
      };
    }

    case forecasts.OUT_OF_DATE: {
      return {
        ...state,
        upToDate: false,
      };
    }

    case forecasts.UP_TO_DATE: {
      return {
        ...state,
        upToDate: true,
      };
    }

    default: {
      return state;
    }
  }
}

export const getFecthingStatus = (state: AppStates) => state.forecastsState.isFetching;
export const getError = (state: AppStates) => state.forecastsState.error;
export const getForecasts = (state: AppStates) => state.forecastsState.forecasts;
export const getTimes = (state: AppStates) => state.forecastsState.times;
export const getCount = (state: AppStates) => state.forecastsState.count;
export const isUpToDate = (state: AppStates) => state.forecastsState.upToDate;
export const getCurrentTime = (state: AppStates) => state.forecastsState.currentTime;
