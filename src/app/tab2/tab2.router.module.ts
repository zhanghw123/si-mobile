import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '/tabs2',
    redirectTo: '/tabs/tab2/resource-list?id=Host',
    pathMatch: 'full'
  },
  {
    path: '',
    component: Tab2Page,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab2/resource-list?id=Host',
        pathMatch: 'full'
      },
      {
        path: 'resource-list',
        children: [
          {
            path: '',
            loadChildren: '../resource-list/resource-list.module#ResourceListPageModule'
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
export class Tab2PageRoutingModule {}
