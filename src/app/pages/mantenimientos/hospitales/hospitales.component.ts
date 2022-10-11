import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/Hospita.modell';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay, Subscription } from 'rxjs';
import { BusquedaService } from '../../../services/busqueda.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit , OnDestroy{

public hospitales:Hospital[]=[];
public cargando:boolean=true;
private imgSub!:Subscription;

  constructor(private hospitalService:HospitalService,
              private modalImageService:ModalImageService,
              private busquedaService:BusquedaService) { }

  ngOnInit(): void {
    this.cargarHospitales();

this.imgSub=this.modalImageService.nuevaImagen
.pipe(delay(100)).subscribe(
  img=>this.cargarHospitales()
)
 }

 ngOnDestroy(): void {
  //todos los emitter se tiene que destruir
  this.imgSub.unsubscribe();
}

buscar(buscar:string){ //mu corto para formularios reactivos

  if (buscar.length===0)
  return this.cargarHospitales();

  this.cargando=true;

 this.busquedaService.buscar('hospitales',buscar)
 .subscribe((res:Hospital[])=>{
  console.log(res);
   this.hospitales=res;
    this.cargando=false;
  }
 );
}

  cargarHospitales(){
    this.cargando=true;    
    this.hospitalService.cargarHospitales().subscribe(
      hospitales=>{
        this.hospitales=hospitales;
        this.cargando=false;
      }
    );
  }

  guardarCambios(hospital:Hospital){

    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre )
    .subscribe(
      res=>{
        Swal.fire('Actualizado',hospital.nombre,'success');
      });
  }

  eliminarHospital(hospital:Hospital){

    this.hospitalService.borrarHospital(hospital._id)
    .subscribe(
      res=>{
        this.cargarHospitales();
        Swal.fire('Borrado',hospital.nombre,'success');
      });   
  }

 async abrirAlert(){

    const {value=''} = await Swal.fire<string>({
      title:'Crear Hospital',
      text:'Ingrese el nuevo Hosptal',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

   if (value!.trim().length>0){
    this.hospitalService.crearHospital(value!).subscribe(
      (resp:any)=>{
        this.hospitales.push(resp.hospital);
      }
    )
   }
  }

  abrirModalImage(hospital:Hospital){
    this.modalImageService.abrirModal('hospitales',hospital._id,hospital.img);
  }

  
}
