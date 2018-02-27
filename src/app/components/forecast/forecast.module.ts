import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ForecastComponent } from './forecast.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ForecastItemComponent } from './forecast-item/forecast-item.component';
import { ForecastInputComponent } from './forecast-input/forecast-input.component';
import { ForecastItemTempComponent } from './forecast-item-temp/forecast-item-temp.component';
import { ForecastTimeComponent } from './forecast-time/forecast-time.component';
import { ForecastLoadingComponent } from './forecast-loading/forecast-loading.component';

import { UnixToDatePipe } from '../../pipes/unix-to-date.pipe';
import { UnixToTimePipe } from '../../pipes/unix-to-time.pipe';
import { CelciusPipe } from '../../pipes/celcius.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ForecastComponent,
    ForecastListComponent,
    ForecastItemComponent,
    ForecastInputComponent,
    ForecastItemTempComponent,
    ForecastLoadingComponent,
    ForecastTimeComponent,
    UnixToDatePipe,
    UnixToTimePipe,
    CelciusPipe,
  ],
  exports: [
    ForecastComponent
  ]
})
export class ForecastModule { }
