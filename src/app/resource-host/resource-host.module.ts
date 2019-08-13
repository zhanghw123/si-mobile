import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResourceHostPage } from './resource-host.page';
import { ProgressbarModule } from '../progressbar/progressbar.module';
const routes: Routes = [
  {
    path: '',
    component: ResourceHostPage
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
  declarations: [ResourceHostPage]
})
export class ResourceHostPageModule {}
