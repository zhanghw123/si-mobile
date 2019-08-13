import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResourceListPage } from './resource-list.page';
import { ProgressbarModule } from '../progressbar/progressbar.module';
const routes: Routes = [
  {
    path: '',
    component: ResourceListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressbarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceListPage]
})
export class ResourceListPageModule {}
