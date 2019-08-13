import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: 'tabs1',
    redirectTo: '/tabs/tab1/unrecover',
    pathMatch: 'full'
  },
  {
    path: '',
    component: Tab1Page,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab1/unrecover',
        pathMatch: 'full'
      },
      {
        path: 'unrecover',
        children: [
          {
            path: '',
            loadChildren: '../alert-unrecover/alert-unrecover.module#AlertUnrecoverPageModule'
          }
        ]
      },
      {
        path: 'recover',
        children: [
          {
            path: '',
            loadChildren: '../alert-recover/alert-recover.module#AlertRecoverPageModule'
          }
        ]
      },
      {
        path: 'confirm',
        children: [
          {
            path: '',
            loadChildren: '../alert-confirm/alert-confirm.module#AlertConfirmPageModule'
          }
        ]
      }
      
    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
