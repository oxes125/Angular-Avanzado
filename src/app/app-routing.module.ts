import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRouringmodule } from './auth/auth.routing.module';

import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { pagesRoutingModule } from './pages/pages.routing';



const routes:Routes=[ //PagesComponent tiene los  <router-outlet> <app-sidebar> <app-header> asi que tiene todos los estilos y los embebe
{path:'', redirectTo:'dashboard', pathMatch: 'full'},
{path:'**', component: NopageFoundComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    pagesRoutingModule,  ///rutas por modulo importar el routing
    AuthRouringmodule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
