import { NumberValueAccessor } from "@angular/forms";
import { Usuario } from '../models/Usuario.model';

export interface CargarUsuarios{
    total:number;
    usuarios:Usuario[]
}