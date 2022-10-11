import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/Usuario.model';
import { Hospital } from '../models/Hospita.modell';
import {Medico} from '../models/Medico.model'

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('x-token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  private transformarUsuarios(result: any[]): Usuario[] {
    return result.map(//importan regresar el objeto en lugar de any
    //se hizo informacion
      user => new Usuario(user.nombre, user.email, user.role, user.google, user.img, '', user.uid)
    );
  }

  private transformarHospitales(result: any[]): Hospital[] {
    return result;
  }

  private transformarMedicos(result: any[]): Medico[] {
    return result;
  }
 
busquedaGlobal(buscar:string){
  const url = `${baseUrl}/todo/${buscar}`;

  return this.http.get<any[]>(url,this.headers);
}

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', busqueda: string) {
    //http://localhost:3005/api/usuarios
    const url = `${baseUrl}/todo/collection/${tipo}/${busqueda}`;
    //return this.http.get<{total:number,usuarios:Usuario[]}>(url, this.headers)

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((res: any) => {//res.result //any regresa onjetos no usuarios asi que hay que castear tipado 
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(res.result);
            case 'hospitales':
              return this.transformarHospitales(res.result);
              case 'medicos':
                return this.transformarMedicos(res.result);

            default:
              return [];
          }
        })
      );
  }
  

  buscarHospitales(tipo: 'hospitales' , busqueda: string = ''){
    const url = `${baseUrl}/todo/collection/${tipo}/${busqueda}`;
    return this.http.get<Hospital[]>(url, this.headers)
    .pipe(
      map((res: any)=>{ //porque tranforma la informacion de cada elemento no es [] y no marque error en result
        return  res.result;
        
      })
    )
    ;
  }
  

}
