import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../a-services/http-api.service';
@Component({
  selector: 'app-resource-config',
  templateUrl: './resource-config.page.html',
  styleUrls: ['./resource-config.page.scss'],
})
export class ResourceConfigPage implements OnInit {

  constructor(
    private httpApi: HttpApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.getConfigInfo(params.id)
    });
  }
  public infoArr = []
  public time = ''
  changeFlag(item) {
    if(item.targetValue.length>1) {
      if(item.flag) {
        item.flag = false
      }else {
        item.flag = true
      }
    }
    
  }
  getConfigInfo(id) {
    let data = {
      instanceId: id
    }
    this.httpApi.post(`/portal/mobile/resource/getResourceSetMessageById.do`, data, {})
      .then(res => {
        console.log(res)
        res.forEach(item => {
          item.flag = false
        });
        this.infoArr = res
        this.time = res[0].collectTime
        console.log(this.infoArr)
      })
  }
}
