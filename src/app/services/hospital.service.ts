import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital, HospitalInterface } from '../models/Hospita.modell';

const baseUrl=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

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

  cargarHospitales(){
    const url=`${baseUrl}/hospitales`;
   // return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers)
   return this.http.get<HospitalInterface>(url, this.headers)
    .pipe(
   //   map( (resp:{ok:boolean,hospitales:Hospital[] }) => resp.hospitales)
   map( (resp:HospitalInterface) => resp.hospitales)
    );

  }

  crearHospital(nombre:string){
    const url=`${baseUrl}/hospitales`;
    return this.http.post(url,{nombre},this.headers);
  }

  actualizarHospital(_id:string , nombre:string ){
    const url=`${baseUrl}/hospitales/${_id}`;
    // url, data {nombre}, headers
    return this.http.put(url,{nombre},this.headers);
  }

  borrarHospital(_id:string ){
    const url=`${baseUrl}/hospitales/${_id}`;
    return this.http.delete(url,this.headers);
  }

  
}
