import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital, Hospitales } from '../../../models/Hospita.modell';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/Medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit , OnDestroy{

  public medicoForm:FormGroup;
  public hospitales:Hospitales[]=[];
  public hospitalSeleccionado:Hospital;
  public medicoSeleccionado:Medico;

  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id})=>{ //medico/:id tienen que ser igual
      this.cargarMedico(id);
    })


    this.medicoForm=this.fb.group({
      nombre:['',[Validators.required]],
      hospital:['',[Validators.required]]

    })

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges //obserbable para cuando cambie
    .subscribe(
      hospitaId=>{

        this.hospitalSeleccionado=this.hospitales.find(h=> h._id===hospitaId);
       
      }
    )

  }

  cargarMedico(id:string){
    if (id==='nuevo')
    return;

    this.medicoService.getMedicosbyId(id)
    .pipe(delay(100))
    .subscribe(
      medico=>{
        
        if (!medico)
        return  this.router.navigateByUrl(`/dashboard/medicos`);

      const{nombre,hospital:{_id}}=medico;
   //  console.log(nombre, _id);
       this.medicoSeleccionado=medico;
       this.medicoForm.setValue({nombre,hospital:_id});
      }
    )
    
  }


  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe(
      (hospitales:Hospitales[])=>{

        this.hospitales=hospitales;
      }
    )
  }



  guardarMedico(){

    const {nombre}= this.medicoForm.value;
    if (this.medicoSeleccionado){
      //actualizar
      const data ={
        ...this.medicoForm.value,
        _id:this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
      .subscribe(res=>{
        console.log(res);
        Swal.fire('Actualizado',`${nombre} actualizado correctamente`,'success');
      })
    }
    else
    {

      this.medicoService.crearmedico(this.medicoForm.value)
      .subscribe(
       (res:any)=>{ //any para que no de error o poner una interface
         console.log(res);
         Swal.fire('Creado',`${nombre} creado correctamente`,'success');
         this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`);
       }
      )
     }
    }




}
