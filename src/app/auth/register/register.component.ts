import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent {

public formSubmit=false;

public registerForm:FormGroup = this.fb.group({
  nombre:['Gabriel',[Validators.required, Validators.minLength(3)]],
  email:['test100@Hotmail.com',[Validators.required, Validators.email]],
  password:['123456',Validators.required],
  password2:['123456',Validators.required],
  terminos:[true,Validators.requiredTrue],
}, {
  //es validators si pones con Validator no funciona
  validators:this.passwordsIguales('password','password2') // tiene que regresa  una funcion ()=>
});

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router) { }

  crearUsuario(){

    this.formSubmit=true;
    console.log(this.registerForm);
    console.log(this.registerForm.value);

   if( this.registerForm.invalid)
    return;


    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(
      {
        next: (v) => {
          console.log('Usuario creado');
           console.log(v)
           this.router.navigateByUrl('/');
        },
        error: (e) => {
          Swal.fire('Error',e.error.msg,'error');
        },
      }

    )
   // console.log('ok');
 //  }else{
   // console.log('Incorrecto');
  // }
  }

  campoNoValido(campo:string):boolean{
    if (this.registerForm.get(campo)?.invalid && this.formSubmit)
      return true;
    else
    return false
  
  }

  contraseniasValid(){

    //recuerda poner el value si no mandas el objeto y no esta buen
    const password1=this.registerForm.get('password')!.value;
    const password2=this.registerForm.get('password2')!.value;

    return (password1!==password2 && this.formSubmit)?true:false;

  }

  passwordsIguales(pas:string,pas2:string){
    return (formGroup:FormGroup)=>{
      const passControl = formGroup.controls[pas];
      const passControl2 = formGroup.controls[pas2];
      console.log(passControl+ ' '+ passControl2);

      if (passControl.value===passControl2.value)
        passControl2.setErrors(null);
      else
        passControl2.setErrors({noEsIgual:true});

    }
  }

}
