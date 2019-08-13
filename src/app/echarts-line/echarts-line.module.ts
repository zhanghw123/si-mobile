import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component'
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [LineChartComponent],
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  exports:[LineChartComponent]
})
export class EchartsLineModule { }
