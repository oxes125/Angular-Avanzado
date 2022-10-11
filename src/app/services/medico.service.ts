import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Medico, responseMedico } from '../models/medico.model';
import { map } from 'rxjs/operators';

const baseUrl=environment.base_url+'/medicos';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http:HttpClient) { }

  get token():string{
    return  localStorage.getItem('x-token') || '';
  }    

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  cargarMedicos(){
    const url=`${baseUrl}`;
    return this.http.get(url,this.headers)
        .pipe(
          map( (res:responseMedico)=>{
            return res.medicos;
          })
        );
  }

  getMedicosbyId(id:string){
    const url=`${baseUrl}/${id}`;

    return this.http.get(url,this.headers)
        .pipe(
          map( (res:{medicos})=>{
            console.log(res);
             return res.medicos;
          })
        );
  }

  crearmedico(medico:{nombre:string, hospital:string}){

    const url=`${baseUrl}`;
//url data headers
    return this.http.post(url,medico,this.headers,)
  }
  actualizarMedico(medico:Medico){
    const url=`${baseUrl}/${medico._id}`;
    return this.http.put(url,medico,this.headers);

  }

  borrarMedico(_id:string){
    const url =`${baseUrl}/${_id}`;

    return this.http.delete(url,this.headers);
  }
}
