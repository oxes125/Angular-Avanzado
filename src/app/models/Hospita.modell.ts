interface _HospitalUser{
    _id:string,
     nombre:string,
     img:string,
}

export class Hospital{
   constructor(
    public nombre:string,
    public _id?:string,
    public img?:string,
    public usuario?:_HospitalUser
   ){}
}

export interface HospitalInterface{
    ok:boolean,
    hospitales:Hospitales[]
}

export interface Hospitales{
    _id:string,
    nombre:string,
    usuario:_HospitalUser
}