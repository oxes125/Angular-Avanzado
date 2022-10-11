import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_URL=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor() { }
  
  async actualizarFoto(
    archivo:File,
    tipo:'usuarios'|'medicos'|'hospitales',
    id:string
  ){ //
    try{

      const url=`${base_URL}/upload/${tipo}/${id}`;
      const formData= new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch(url,{ //peticiones http de javascript
        method:'PUT',
        headers:{
          'x-token':localStorage.getItem('x-token') || ''
        },
        body:formData
      }) 

      const data = await resp.json();

      //console.log(data);

      if (data.ok)
          return data.nombreArchivo;
        else{
          console.log(data.msg);
          return false 
        } 

    }catch(e){
      console.log(e);
      return false;
    }
  }
}
