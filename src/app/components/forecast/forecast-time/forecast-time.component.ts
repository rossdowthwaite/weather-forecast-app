import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-forecast-time',
  templateUrl: './forecast-time.component.html',
  styleUrls: ['./forecast-time.component.css'],
})
export class ForecastTimeComponent implements OnInit {

  @Input() times: Observable<number[]>;

  date: number;

  constructor() { }

  ngOnInit() {
    this.times.subscribe( (times) => {
      this.date = times[0];
    });
  }

}
