import { Action } from '@ngrx/store';
import { Forecast } from '../../interfaces/forecast';

export const ADD_FORECAST = '[forecast] ADD_FORECAST';
export const ADD_FORECAST_SUCCESS = '[forecast] ADD_FORECAST_SUCCESS';
export const ADD_FORECAST_FAIL = '[forecast] ADD_FORECAST_FAIL';

export const UPDATE_FORECAST = '[forecast] UPDATE_FORECAST';
export const UPDATE_FORECAST_SUCCESS = '[forecast] UPDATE_FORECAST_SUCCESS';
export const UPDATE_FORECAST_FAIL = '[forecast] UPDATE_FORECAST_FAIL';

export const REMOVE_FORECAST = '[forecast] REMOVE_FORECAST';
export const REMOVE_FORECAST_SUCCESS = '[forecast] REMOVE_FORECAST_SUCCESS';
export const REMOVE_FORECAST_FAIL = '[forecast] REMOVE_FORECAST_FAIL';

export const ADD_TIMES = '[forecast] ADD_TIME';
export const ADD_TIMES_DONE = '[forecast] ADD_TIMES_SUCCESS';
export const CLEAR_TIMES = '[forecast] CLEAR_TIMES';

export const OUT_OF_DATE = '[forecast] OUT_OF_DATE';
export const UP_TO_DATE = '[forecast] UP_TO_DATE';

/**
*  Add Forecast actions
*/
export class AddForecastAction implements Action {
  readonly type = ADD_FORECAST;

  constructor(public payload: string) {
    console.log('ADD_FORECAST');
  }
}

export class AddForecastSuccessAction implements Action {
  readonly type = ADD_FORECAST_SUCCESS;

  constructor(public payload: Forecast) {
    console.log('ADD_FORECAST_SUCCESS');
  }
}

export class AddForecastFailAction implements Action {
  readonly type = ADD_FORECAST_FAIL;

  constructor() {
    console.log('ADD_FORECAST_FAIL');
  }
}


export class UpdateForecastAction implements Action {
  readonly type = UPDATE_FORECAST;

  constructor(public payload: string) {
    console.log('UPDATE_FORECAST');
  }
}

export class UpdateForecastSuccessAction implements Action {
  readonly type = UPDATE_FORECAST_SUCCESS;

  constructor(public payload: Forecast) {
    console.log('UPDATE_FORECAST_SUCCESS');
  }
}

export class UpdateForecastFailAction implements Action {
  readonly type = UPDATE_FORECAST_FAIL;

  constructor() {
    console.log('UPDATE_FORECAST_FAIL');
  }
}


/**
*  Remove Forecast actions
*/
export class RemoveForecastAction implements Action {
  readonly type = REMOVE_FORECAST;

  constructor(public payload: Forecast) {
    console.log('REMOVE_FORECAST');
  }
}


/**
*  Add Times actions
*/
export class AddTimesAction implements Action {
  readonly type = ADD_TIMES;

  constructor() {
    console.log('ADD_TIMES');
  }
}

export class AddTimesDoneAction implements Action {
  readonly type = ADD_TIMES_DONE;

  constructor() {
    console.log('ADD_TIMES_DONE');
  }
}

export class ClearTimesAction implements Action {
  readonly type = CLEAR_TIMES;

  constructor() {
    console.log('CLEAR_TIMES');
  }
}

/**
*  Up to date actions
*/
export class OutOfDateAction implements Action {
  readonly type = OUT_OF_DATE;

  constructor() {
    console.log('OUT_OF_DATE');
  }
}

export class UpToDateAction implements Action {
  readonly type = UP_TO_DATE;

  constructor() {
    console.log('UP_TO_DATE');
  }
}

export type Actions
= AddForecastAction
| AddForecastSuccessAction
| AddForecastFailAction
| UpdateForecastAction
| UpdateForecastSuccessAction
| UpdateForecastFailAction
| RemoveForecastAction
| AddTimesAction
| AddTimesDoneAction
| ClearTimesAction
| OutOfDateAction
| UpToDateAction;
