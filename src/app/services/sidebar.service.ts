import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu=[];

  cargarMenu(){
    this.menu= JSON.parse(localStorage.getItem('menu')) || [];
    
  }

/*
  menu:any[]=[
    {
    titulo:'Principal',
    icon:'mdi mdi-gauge',
    subMenu:[
      {titulo:'Main',url:'/'},
      {titulo:'Progress Bar',url:'progress'},
      {titulo:'Promesas',url:'promesas'},
      {titulo:'Rxjs',url:'rxjs'},
      {titulo:'Graficas',url:'grafica1'},
    ]
    },
    {
      titulo:'Mantenimiento',
      icon:'mdi mdi-folder-lock-open',
    subMenu:[
      {titulo:'Usuarios',url:'usuarios'}, //tiene que coinsidir con page routing
      {titulo:'Hospitales',url:'hospitales'},
      {titulo:'medicos',url:'medicos'},
    ]
  }
  ];
*/


}
