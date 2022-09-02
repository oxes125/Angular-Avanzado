import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopageFoundComponent } from './pages/nopage-found/nopage-found.component';
import { PagesComponent } from './pages/pages.component';



const routes:Routes=[ //PagesComponent tiene los  <router-outlet> <app-sidebar> <app-header> asi que tiene todos los estilos y los embebe
{path:'', component: PagesComponent ,//rutas protegidas con estilo o template, cumplen condiciones de disenio es la misma
children:[
  {path:'dashboard', component: DashboardComponent},
  {path:'progress', component:ProgressComponent},
  {path:'grafica1', component:Grafica1Component},
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  
]
}, 

{path: 'login', component: LoginComponent},     //sin estylo 
{path:'register', component:RegisterComponent},

{path:'**', component: NopageFoundComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
