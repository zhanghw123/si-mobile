import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResourceDetailsPage } from './resource-details.page';
import { DetailsPageRoutingModule } from './details.router.module'
const routes: Routes = [
  {
    path: '',
    component: ResourceDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceDetailsPage]
})
export class ResourceDetailsPageModule {}
