import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {  retry, take, map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent  implements OnDestroy {

  numero:number=0;

 public subscription!:Subscription;

  constructor() {
 
   this.subscription= this.retornaIntervalo().subscribe(console.log
     // (valor)=>console.log('Intervalo: '.concat(valor.toString()))
    )
/*
    this.retornaObserbable()
    .pipe( //  transforma informacion del obserbable
    // emty indefinidamente o con valor intenta dos veces
    //retry(1) //intentar varias veces hasta que lo logre si hay error continua ejemplo error en dos pero sigue iprimiend hasta 4
    
    ) 

   // .forEach()
    .subscribe(//se necesita una persona subscrita para trabajar
    { 
    next: (v) => {console.log(v)},
    error: (e)=> {console.error( e)},
    complete: () => {console.info('complete')} 
    }
    
    /*
    valor=>console.log('Subs: ', valor),
    (err)=> console.warn('Error: ',err), // si hya error no llega al complete
    ()=>console.info('Obs terminado') //complete no recibe ningun argumento
    */
    //);
    
   }



  retornaIntervalo():Observable<number>{

    return interval(100) //interval es un obserbable
    .pipe(//importante los operadores
      map(valor=>{return valor+1}), //'Obserbable interval '.concat((valor+1).toString())
      filter(valor => (valor % 2 === 0)?true:false),  //true or false
     // take(10) ,// cuantas emiciones del obserbable se necesitan
     
    
    )
;
  
  }

 
   retornaObserbable():Observable<number>{
    let i=-1; //i mantenga su valor
 
   return   new Observable<number>( observer=>{ //call back observer emit los valores y llevan $
   i++;
     const intervalo= setInterval(()=>{  //si no se asigna es una funcion anonima
       // console.log('tick'+ this.numero++);
        i++;
        observer.next(i)  //emitir valor   //add, remove, complete, error, next, unsubscribe

      if (i===4){
        
        clearInterval(intervalo); //limpia el intervalo a cero
        observer.complete();
      }

      if (i===2){
      //  i=0;
        console.log('Error i=2');
        //observer.error('llego a dos por error'); //termina por error
     throw new Error('too high!');
      }

      },1000)
    });


   }


   ngOnDestroy(): void {
    console.log('Termina subscripcion');
      this.subscription.unsubscribe();
     // this.obs.subscribe.
    }

}
