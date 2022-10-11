import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  
@Input() titulo:string='Sin titulo';
@Input() datos:number[]=[350,450,100];


  // Doughnut
  @Input('labels') doughnutChartLabels: string[]=['label1','label2','label3'];
  
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {  data: [ 350, 450, 100 ],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBorderColor:['#000000','#000000','#00000003'] }
  
    ]
  };


  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
