import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ForecastTimeComponent } from './forecast-time.component';
import { Times } from '../../../interfaces/times';
import { UnixToDatePipe } from '../../../pipes/unix-to-date.pipe';
import { UnixToTimePipe } from '../../../pipes/unix-to-time.pipe';

describe('ForecastTimeComponent', () => {
  let component: ForecastTimeComponent;
  let fixture: ComponentFixture<ForecastTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForecastTimeComponent,
        UnixToDatePipe,
        UnixToTimePipe,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastTimeComponent);
    component = fixture.componentInstance;
    component.times = Observable.of(Times.generateMockTimes());
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init date to equal first times value', () => {
    const firstDate = component.times['value'][0];
    expect(component.date).toEqual(firstDate);
  });

  it('should have time values to have 10 chars', () => {
    const date = component.times['value'][0] + '';

    expect(date.length).toEqual(10);
  });
});
