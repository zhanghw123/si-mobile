import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../a-services/http-api.service';
@Component({
  selector: 'app-resource-maintenance',
  templateUrl: './resource-maintenance.page.html',
  styleUrls: ['./resource-maintenance.page.scss'],
})
export class ResourceMaintenancePage implements OnInit {

  constructor(
    private httpApi: HttpApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  public info = {
    location: '',
    system: '',
    realName: '',
    userEmail: '',
    userPhone: '',
  };
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.getConfigInfo(params.id)
    });
  }
  getConfigInfo(id) {
    let data = {
      id: id
    }
    this.httpApi.post(`/portal/mobile/resource/getResourceMaintenanceById.do`, data, {})
      .then(res => {
        
       if(res){
        this.info = res
       }
      })
  }
}
