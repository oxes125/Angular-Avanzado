import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  constructor() { }

  private _ocultarModal:boolean=true; //standar propiedad provada

  public tipo!:'usuarios'| 'medicos'|'hospitales';
  public id:string='';
  public img?:string

  public nuevaImagen:EventEmitter<string> = new EventEmitter<string>(); //emitir obserbable

  get ocultarModal(){
    return this._ocultarModal;
   }

  abrirModal(tipo:'usuarios'| 'medicos'|'hospitales', id:string='', img:string='no-image'){
    this._ocultarModal=false;
    this.tipo=tipo;
    this.id=id;
    this.img=img;


      if (img?.includes('https')){
        this.img=img;
      }else{
        this.img=`${baseUrl}/upload/${tipo}/${img}`;
      }
  }

  cerrarModal(){
    this._ocultarModal=true;
  }


}
