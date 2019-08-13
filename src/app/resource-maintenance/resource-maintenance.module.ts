import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResourceMaintenancePage } from './resource-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: ResourceMaintenancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceMaintenancePage]
})
export class ResourceMaintenancePageModule {}
