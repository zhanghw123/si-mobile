import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TabsNavComponent } from '../tabs-nav/tabs-nav.component';
import { AlertListComponent } from '../alert-list/alert-list.component';



import { Tab1PageRoutingModule } from './tab1.router.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [
    Tab1Page, 
    TabsNavComponent , 
    AlertListComponent ,
   

  ]
})
export class Tab1PageModule {}
