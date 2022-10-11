import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }




  //@Input('valor') progreso:number=50;  //valor renombrar argumento
  @Input() btnClass: string = 'btn-primary'

  @Input() progreso: number = 50;
  @Output() valorsalida: EventEmitter<number> = new EventEmitter(); //evewntemiter los output


  barControl(valor: number) {

    if (this.progreso >= 100 && valor >= 0) {
      this.valorsalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor <= 0) {
      this.valorsalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorsalida.emit(this.progreso);
  }

  onChange(newValor:number) {

    console.log(newValor);
    
    if (newValor>=100)

    this.progreso=100;
    else if (newValor<=0)
    this.progreso=0;
    else
    this.progreso=newValor;

    this.valorsalida.emit(this.progreso); //manda el valor
  
  }
}
