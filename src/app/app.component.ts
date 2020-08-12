import { Component, DoCheck, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{

  isError = true;

  constructor(private router: Router) {
  }

  ngDoCheck() {
    this.isError = this.router.url.includes('/error');
  }

}
