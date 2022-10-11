import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

public perfilForm!:FormGroup;
public usuario!:Usuario;
public imagenSubir!:File;
public imgTemp:any=null;

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileService:FileUploadService) {
                //importante son pasados por referencia asi que al hacer esto apuntas al objeto y actualizas
                //singleton en dodos los lugares ususario es la misma instancia
                this.usuario=usuarioService.usuario; //asignacion
               }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email ]]
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarperfil(this.perfilForm.value)
    .subscribe(res=>{
      console.log(res);

      const {nombre,email} = this.perfilForm.value;
      this.usuario.nombre=nombre;
      this.usuario.email=email;
      Swal.fire('Guardado','Los cambios fueron guardados');
    },(err)=>{
      console.log(err.error.msg);
     Swal.fire('Error', err.error.msg,'error');
    })
    console.log(this.perfilForm.value);
  }

  actualizarImagen(event:any){
    const file= event.target.files[0];
    console.log(file);
    this.imagenSubir=file;
    if (!file)
    return this.imgTemp=null; 
    
    const reader = new FileReader();
    const url64=reader.readAsDataURL(file);
    reader.onloadend=()=>{
      //console.log(reader.result);
      this.imgTemp=reader.result;
    }

  }
 
  
  subirimagen(){
    console.log(this.usuario);
    
    this.fileService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
    .then(img=>{
      this.usuario.img=img;
      Swal.fire('Guardado','Imagen Actualizada');
    }
  ).catch(e=>
    {
      console.log(e);
      Swal.fire('Error','no se pudo subir la imagen','error');
    })
  }
}
