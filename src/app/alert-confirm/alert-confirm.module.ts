import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlertConfirmPage } from './alert-confirm.page';
import { NoDataComponent } from '../no-data/no-data.component';
const routes: Routes = [
  {
    path: '',
    component: AlertConfirmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlertConfirmPage,NoDataComponent]
})
export class AlertConfirmPageModule {}
