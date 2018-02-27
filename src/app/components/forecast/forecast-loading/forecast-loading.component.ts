import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-loading',
  templateUrl: './forecast-loading.component.html',
  styleUrls: ['./forecast-loading.component.css'],
})
export class ForecastLoadingComponent implements OnInit {

  @Input() error: string;
  @Input() fetching: boolean;

  constructor() { }

  ngOnInit() {
  }

}
