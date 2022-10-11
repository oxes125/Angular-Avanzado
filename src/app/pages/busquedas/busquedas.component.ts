import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from '../../services/busqueda.service';
import { Medico } from '../../models/Medico.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { Hospital } from 'src/app/models/Hospita.modell';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

public usuarios:Usuario[]=[];
public medicos:Medico[]=[];
public hospitales:Hospital[]=[];

  constructor(private activatedRoute:ActivatedRoute,
    private busquedasService:BusquedaService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({buscar})=>{
       // console.log(buscar);
       this.busquedaGlobal(buscar);
      }
    )
  }

  busquedaGlobal(buscar:string){
    this.busquedasService.busquedaGlobal(buscar).subscribe(
      (resp:any)=>{ //any[] se quitan los corchetes para 
        console.log(resp);
        console.log(resp.usuarios);
       this.usuarios=resp.usuarios;
       this.medicos=resp.medicos;
       this.hospitales=resp.hospitales;
      }
    )
  }
  
  abrirMedicos(medico:Medico){
    console.log(medico);

  }

}


