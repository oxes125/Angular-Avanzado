import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

public imgUrl:string='';
public usuario!:Usuario;

  constructor(private usuarioService:UsuarioService,
              private  router:Router  ) { //asegurarse el router routerModule

    this.usuario=this.usuarioService.usuario;
    this.imgUrl=this.usuarioService.usuario.imageUrl;
   }

 logout(){
  this.usuarioService.logout();
 }


 buscar(buscar:string){

  if (buscar.length===0)
 return;
 
this.router.navigateByUrl(`/dashboard/buscar/${buscar}`);
//console.log(buscar);


 }

}
