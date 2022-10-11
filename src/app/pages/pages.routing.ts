import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';



const routes: Routes = [
    {path:'dashboard', component: PagesComponent ,//rutas protegidas con estilo o template, cumplen condiciones de disenio es la misma
    canActivate:[AuthGuard],
    canLoad:[], //add verificar que se pueda cargar
    loadChildren:()=>import('./child-routes.module').then(m=>m.ChildRoutesModule) // se necesita el canLoad con lazyLoad
    /*
    children:[
    //aqui estaba las rutas pero carga peresoza 
    ]
    */
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class pagesRoutingModule {}
