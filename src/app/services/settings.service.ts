import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private  linkTheme= document.querySelector('#theme');

  constructor() { 

    //<link href="./assets/css/colors/default-dark.css" id="theme" rel="stylesheet">

   const theme= localStorage.getItem('theme') || './assets/css/colors/default-dark.css'; //interesante ||

   this.linkTheme?.setAttribute('href',theme);
  }

  
  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() { //vanila javascrip javascrip puro

    const link = document.querySelectorAll('.selector'); //esperar links que existan
   // public link!: NodeListOf<Element>; //esperar links que existan

    link.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }


    })

}
}
