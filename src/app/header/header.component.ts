import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../app.component.css']
})
export class HeaderComponent {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.use(localStorage.getItem('lang') || 'en');
  }

  setTextColor(lang) {
    return (lang==this.translate.currentLang) ? 'text-highlight' : 'text-normal';
  }

  switchLang(lang) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }

}
