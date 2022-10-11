import { Hospital } from "./Hospita.modell";
import { Usuario } from "./Usuario.model";


export interface responseMedico {
    ok: boolean;
    medicos: Medico[];
}

export class Medico{
    constructor(
       public nombre: string,
       public _id?: string,
       public img?: string,
       public usuario?: Usuario,
       public hospital?: Hospital,
    ){}
}