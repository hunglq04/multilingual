import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  products: [];

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  setTextColor(lang) {
    let currLang = localStorage.getItem('lang') || 'fr';
    return (lang==currLang) ? 'text-primary' : 'text-secondary';
  }

  switchLang(lang) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
}
