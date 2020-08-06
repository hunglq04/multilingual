import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  products: [];

  constructor(public translate: TranslateService, private appService: AppService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    // this.getProducts();
  }

  getProducts() {
    this.appService.getProducts()
    .then(res => this.products = res)
    .catch(err => console.error(err))
  }

  setTextColor(lang) {
    let currLang = localStorage.getItem('lang') || 'vi';
    return (lang==currLang) ? 'text-primary' : 'text-secondary';
  }

  switchLang(lang) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    // this.getProducts();
  }
}
