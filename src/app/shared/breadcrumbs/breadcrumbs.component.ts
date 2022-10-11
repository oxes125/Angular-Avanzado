import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent  implements OnDestroy{

  Titulo:string='';
public tituloSubs$:Subscription | undefined; //todos los subscribe o obserbables se tienen que unsubscribe para destruilo


  constructor(private router:Router, private router2:ActivatedRoute) {
  //console.log(router2.snapshot.children[0].data); 

    this.tituloSubs$= this.getArgumentosRuta() .subscribe(({titulo})=>{//desestructuracion data.titulo
      this.Titulo=titulo;
      document.title=`AdminPro - ${titulo}`;
    })
   }
  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }


   getArgumentosRuta(){
   return this.router.events
    .pipe( 
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((url:ActivationEnd) => url.snapshot.firstChild===null),
      map((url:ActivationEnd)=>url.snapshot.data)
      )
   }


}
