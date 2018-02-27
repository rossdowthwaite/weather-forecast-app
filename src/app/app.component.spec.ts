import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ForecastModule } from './components/forecast/forecast.module';
import { ForecastService } from './services/forecast.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ForecastModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule,
      ],
      providers: [ ForecastService ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
