import { Component } from '@angular/core';

@Component({
  selector: 'app-nopage-found',
  templateUrl: './nopage-found.component.html',
  styleUrls:['./nopage-found.css']
})
export class NopageFoundComponent  {

   year = new Date().getFullYear();


}