import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {


  doughnutChartLabels: string[] = [ 'Pan', 'Refresco', 'Tacos' ];
public data1:ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [ {  data: [ 100, 100, 100 ],
                 backgroundColor: ['#00821C','#09DB36','#024D0F'],
                 hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
                 hoverBorderColor:['#000000','#000000','#00000003']
              },
            ]
};

}
