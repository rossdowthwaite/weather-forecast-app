import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ForecastModule } from './components/forecast/forecast.module';
import { ForecastService } from './services/forecast.service';
import { forecastReducers } from './store/forecast/forecast.reducer';
import { ForecastEffects } from './store/forecast/forecast.effect';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ForecastModule,
    HttpClientModule,
    StoreModule.forRoot( forecastReducers ),
    EffectsModule.forRoot([ForecastEffects]),
  ],
  providers: [
    ForecastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
