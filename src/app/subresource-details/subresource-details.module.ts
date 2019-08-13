import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubresourceDetailsPage } from './subresource-details.page';

const routes: Routes = [
  {
    path: '',
    component: SubresourceDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubresourceDetailsPage]
})
export class SubresourceDetailsPageModule {}
