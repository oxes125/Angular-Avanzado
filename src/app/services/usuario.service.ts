import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login';
import { RegisterForm } from '../interfaces/register-form';
import {catchError, delay, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { CargarUsuarios } from '../interfaces/carga-usuarios';

const baseUrl=environment.base_url;

declare const google:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(private http:HttpClient,
            private router:Router) {}

  get token():string{
    return  localStorage.getItem('x-token') || '';
  }    
  
  get uID(){
    return this.usuario.uid;
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  get role():'ADMIN_ROLE'|'USER_ROLE'{
    return this.usuario.role;
  }

  guardarStorage(token:string, menu:string){
    //console.log(JSON.stringify(token) + ' ' +JSON.stringify(menu));
    localStorage.setItem('x-token',token);
    //local sorage graba solo string y tiene es un objeto asi que se transgorma en string
    localStorage.setItem('menu',JSON.stringify(menu)); 
  }


 logout(){
  localStorage.removeItem('x-token');
  localStorage.removeItem('menu');

  google.accounts.id.revoke('oxes125@gmail.com',()=>{
    this.router.navigateByUrl('/login');
  })
 } 


  crearUsuario(formData:RegisterForm){//tipado
  
   return this.http.post(`${baseUrl}/usuarios`,formData).pipe(
    tap((resp:any) =>{ //regresa obserbable atp adicionar un paso
     this.guardarStorage(resp.token, resp.menu);
    })
  );
  }

  login(formData:LoginForm){
    return this.http.post(`${baseUrl}/login`,formData)
    .pipe(
      tap((resp:any) =>{ //regresa obserbable atp adicionar un paso
        this.guardarStorage(resp.token, resp.menu);
      })
    );
  }

  loginGoogle(token:string){
    return this.http.post(`${baseUrl}/login/google`,{token})
    .pipe(
      tap((resp:any)=>{
        this.guardarStorage(resp.token, resp.menu);
      })
    )
  }

  validarToken():Observable<boolean>{
  
    return this.http.get(`${baseUrl}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      //replace tap
      map((resp:any)=>{
        const {nombre, email,role,google,img='',uid} =resp.usuario;

        this.usuario= new Usuario(nombre,email,role,google,img,'',uid);
        this.usuario.imprimirUsuario(); // si no es una instancia del usuario no recononce los metodos

        this.guardarStorage(resp.token, resp.menu);
        return true;
      }),
     // map(resp=>true),
      catchError(error=>{
        console.log(error);
        return of(false)})//nuevo obserbable 
    );
  }

  actualizarperfil(data:{email:string,nombre:string, role:string}){ //mejor interface

    data={
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${baseUrl}/usuarios/${this.uID}`, data,this.headers);
  }

  cargarusuarios(desde:number=0){

    const url=`${baseUrl}/usuarios?desde=${desde}`;
    //return this.http.get<{total:number,usuarios:Usuario[]}>(url, this.headers)
    return this.http.get<CargarUsuarios>(url, this.headers)
    .pipe(
   //   delay(1000), probar el loadiong
      map(res=>{
        const usuarios = res.usuarios.map(
          user=>new Usuario(user.nombre,user.email,user.role,user.google,user.img,'',user.uid)
          );
        return  {
          total:res.total,
          usuarios
        }
      })
    )
  }

eliminarUsuario(usuario:Usuario){
  const url=`${baseUrl}/usuarios/${usuario.uid}`;
  return this.http.delete(url, this.headers); //cundo son peticiones se tiene que subscribir

}

guardarusuario(usuario:Usuario){ //mejor interface

      return this.http.put(`${baseUrl}/usuarios/${usuario.uid}`, usuario,this.headers);
    }

}
