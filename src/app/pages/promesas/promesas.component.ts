import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios=>{console.log(usuarios)});
/*
    const promesa = new Promise((resolve, reject) => {  //java script crea la promesa es sincrono 

      if (false)
        resolve('hola mundo');
      else
        reject('algo salio mal');

    });

    promesa.then((mensaje) => {  //asincrono
      console.log(mensaje)
    }).catch(error=> console.log(error))
    .finally(()=>console.log('temrine'))

    console.log('fin del init');
*/

  }
  getUsuarios() { //

    const promesa = new Promise(resolve=>{
      fetch('https://reqres.in/api/users') //promesa //asincrono se quedan colgados si cambias de pagina y regresas a la misma se ejecuta otro obserbable y puede haber problemas de memoria
      .then(resp=>
        resp.json()
      //  resp.json().then(body=>console.log(body))
      )
      .then(body=>resolve(body.data))
    });
  
    return promesa;

   }
}
