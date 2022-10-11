import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2'



declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }
  ngAfterViewInit() {
    this.googleinit();
  }


  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || 'oxes125@hotmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    rememberMe: [false]
  });



  googleinit() {
    google.accounts.id.initialize({
      client_id: "973175614534-uo4c3758utct13brpin9kus26q8c0upv.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response) //
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,  //referencia local
      //document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }


  handleCredentialResponse(response: any) {
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe({
        next: (ok) => {
          this.router.navigateByUrl('/');
          //  console.log({login:ok});

        },
        error: (e) => {
          Swal.fire('Error', e.error.msg, 'error');
        }
      }
      );
  }


  login() {
    const { email, password, rememberMe } = this.loginForm.value;

    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        {
          next: (v) => {
            if (this.loginForm.get('rememberMe')?.value)
              localStorage.setItem('email', this.loginForm.get('email')?.value);
            else
              localStorage.removeItem('email');

            this.router.navigateByUrl('/');

          },
          error: (e) => {
            Swal.fire('Error', e.error.msg, 'error');
          }

        }
      );

   // console.log(this.loginForm.value);
    //this.router.navigateByUrl('/');
  }



}
