import { Component, OnInit } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

//publico para injectar el modal desde cualquier lugar del html por referencia
//si es privado si tiene que instanciar en caso contrario puede ser usada
  constructor(public modalimageService:ModalImageService,
              public fileService:FileUploadService) { }

  public imagenSubir!:File;
  public imgTemp:any=null;

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp=null;
    this.modalimageService.cerrarModal();
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
    const id=this.modalimageService.id;
    const tipo=this.modalimageService.tipo;

    this.fileService.actualizarFoto(this.imagenSubir,tipo,id)
    .then(img=>{
      Swal.fire('Guardado','Imagen Actualizada');

      this.modalimageService.nuevaImagen.emit(img);
      this.cerrarModal();
    }
  ).catch(e=>
    {
      console.log(e);
      Swal.fire('Error','no se pudo subir la imagen','error');
    })
  }

}
