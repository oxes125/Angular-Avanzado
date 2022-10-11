import { environment } from '../../environments/environment'

const base_url = environment.base_url;
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public role: 'ADMIN_ROLE'|'USER_ROLE',
        public google: boolean = false,
        public img: string,
        public password: string,
        public uid: string
    ) { };

    imprimirUsuario() {
     //   console.log(this.nombre);
    }

    get userNombre() {
        return this.nombre;
    }
    get userEmail() {
        return this.email;
    }

    get imageUrl() {
        //  console.log(this.google);
        //  console.log(`${base_url}/upload/usuarios/${this.img}`);
        //upload/usuarios/4b0ba6f3-3c2f-4d97-ac10-28cc94dab012.jpg

        if (!this.img)
            return `${base_url}/upload/usuarios/no-image`;
        else 
        
        if (this.img.includes('https')) {
            return this.img;
        } else if (this.img)
            return `${base_url}/upload/usuarios/${this.img}`;
        else
            return `${base_url}/upload/usuarios/no-image`;
    }
}