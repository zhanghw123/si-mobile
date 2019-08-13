import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceDetailsPage } from './resource-details.page';
const routes: Routes = [
  {
    path: '/resource-details',
    redirectTo: '/resource-details/overview',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ResourceDetailsPage,
    children: [
      {
        path: '',
        redirectTo: '/resource-details/overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        children: [
          {
            path: '',
            loadChildren: '../resource-overview/resource-overview.module#ResourceOverviewPageModule'
          }
        ]
      },
      {
        path: 'subresource',
        children: [
          {
            path: '',
            loadChildren: '../subresource-details/subresource-details.module#SubresourceDetailsPageModule'
          }
        ]
      },
      {
        path: 'resource-config',
        children: [
          {
            path: '',
            loadChildren: '../resource-config/resource-config.module#ResourceConfigPageModule'
          }
        ]
      },
      {
        path: 'resource-maintenance',
        children: [
          {
            path: '',
            loadChildren: '../resource-maintenance/resource-maintenance.module#ResourceMaintenancePageModule'
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
export class DetailsPageRoutingModule {}
