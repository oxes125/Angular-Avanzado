import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`
    ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[]=[];
  public imgUrl='';
  public usuario!:Usuario;
  
  constructor(public sidebasService:SidebarService,
              private usuarioService:UsuarioService) { 
    this.usuario=this.usuarioService.usuario;
     this.imgUrl=this.usuarioService.usuario.imageUrl;  
           
  }

  ngOnInit(): void {
    this.menuItems=this.sidebasService.menu;
  }

}
