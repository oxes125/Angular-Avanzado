import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/Medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { BusquedaService } from '../../../services/busqueda.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit , OnDestroy{

  public cargando:boolean=true;
  public medicos:Medico[]=[];
  public imgSubs:Subscription;

  constructor(private medicoService:MedicoService,
              private modalImageService:ModalImageService,
              private busquedaService:BusquedaService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarmedicos();
    this.imgSubs=this.modalImageService.nuevaImagen
    .pipe(delay(100)).subscribe(img=>this.cargarmedicos());
  }

  cargarmedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos()
    .subscribe((medicos)=>{
      this.cargando=false;
      this.medicos=medicos;
      
    }

    );
  }

  abrirModal(medico:Medico){
    this.modalImageService.abrirModal('medicos',medico._id,medico.img);
  }

  buscar(buscar:string){

    if (buscar.length===0)
    return this.cargarmedicos;

    this.busquedaService.buscar('medicos',buscar)
    .subscribe( (resp:Medico[])=>{// :Medico[] fixed type xxxn no es asiganable a tipo xxx
      this.medicos=resp; 
    });
  }

  borrarMedico(medico:Medico){

        Swal.fire({
          title: 'borrar usuario?',
          text: `esta a punto de borrar ${medico.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo!'
        }).then((result) => {
          if (result.isConfirmed) {
    
            this.medicoService.borrarMedico(medico._id)
            .subscribe( res=>{
    
              Swal.fire('usuario Borrado',
              `${medico.nombre} fue eliminado correctament`,
              'success')
    
              this.cargarmedicos();
            }
              
            )
    
    
          }
        })
  }

}
