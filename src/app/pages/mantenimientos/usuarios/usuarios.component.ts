import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedaService } from '../../../services/busqueda.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios:number=0;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];
  public pagina: number=0;
  public cargando:boolean=true;

  public imgSubs!:Subscription;

  constructor(private usuarioService:UsuarioService,
              private busquedaService:BusquedaService,
              private modalService:ModalImageService) { }

  ngOnDestroy(): void {
    //todos los emitter se tiene que destruir
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.navegarUsuarios();
    this.imgSubs=this.modalService.nuevaImagen
    .pipe(
      delay(200)
    )
    .subscribe(img=>{
      this.navegarUsuarios()}); //carga ka kista se necesita un emiter 
  }

  navegarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarusuarios(this.pagina)
    .subscribe(({total,usuarios})=>{
      this.totalUsuarios=total;
      this.usuarios=usuarios;
      this.usuariosTemp=usuarios
      this.cargando=false;
 
    })
  }
  navegarPagina(pagina:number){
    this.pagina+=pagina;
    if (this.pagina<0)
    this.pagina=0;
    else if (this.pagina>this.totalUsuarios)
    this.pagina-=pagina;

    this.navegarUsuarios();
  }


  buscar(buscar:string){ //mu corto para formularios reactivos

    if (buscar.length===0)
    return this.usuarios=this.usuariosTemp;

    this.cargando=true;

   this.busquedaService.buscar('usuarios',buscar)
   .subscribe((res:Usuario[]) =>{
    console.log(res);
    
      this.usuarios=res;
      this.totalUsuarios=res.length;
      this.cargando=false;
      
    }
   );
  }

  eliminarusuario(usuario:Usuario){

//importante no eliminarse uno mismo

if (usuario.uid===this.usuarioService.uID){
  return Swal.fire('Waning',
          `No se puede borrarse uno mismo`,
          'warning');

}
    Swal.fire({
      title: 'borrar usuario?',
      text: `esta a punto de borrar ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario)
        .subscribe( res=>{

          Swal.fire('usuario Borrado',
          `${usuario.nombre} fue eliminado correctament`,
          'success')

          this.navegarUsuarios();
        }
          
        )


      }
    })
  }
  

  cambiarRol(usuario:Usuario){

    this.usuarioService.guardarusuario(usuario)
    .subscribe(res=>{
      console.log(res);
    })
  }

  abrirModal(usuario:Usuario){

 this.modalService.abrirModal('usuarios',usuario.uid,usuario.img);
  }

}
