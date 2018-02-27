import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastLoadingComponent } from './forecast-loading.component';

describe('ForecastLoadingComponent', () => {
  let component: ForecastLoadingComponent;
  let fixture: ComponentFixture<ForecastLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
