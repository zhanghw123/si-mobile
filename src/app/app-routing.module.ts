import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'alert-tabs', loadChildren: './alert-tabs/alert-tabs.module#AlertTabsPageModule' },
  { path: 'alert-details', loadChildren: './alert-details/alert-details.module#AlertDetailsPageModule' },
  { path: 'resource-details', loadChildren: './resource-details/resource-details.module#ResourceDetailsPageModule' },
 
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
