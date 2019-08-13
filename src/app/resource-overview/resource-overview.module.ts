import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResourceOverviewPage } from './resource-overview.page';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsLineModule } from '../echarts-line/echarts-line.module';
const routes: Routes = [
  {
    path: '',
    component: ResourceOverviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEchartsModule,
    EchartsLineModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceOverviewPage]
})
export class ResourceOverviewPageModule {}
