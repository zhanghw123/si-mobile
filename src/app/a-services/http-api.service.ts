import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/toPromise';  
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { 
    this.host = localStorage.getItem('si-host') || ''
    
  }
  public host = ''
  checkToken():Promise<any> {
    const token = localStorage.getItem('si-token');
    
    
    return this.http.get(`${this.host}/portal/mobile/login/validate.do`,{
        params: {
          authorization:token
        },
      }).toPromise()
  }
  get(url,options): any {
    
    let defalt = {
      params: {
        authorization: localStorage.getItem('si-token') || ''
      }
    }
    let obj = _.merge({},options,defalt)
    
    return this.checkToken().then(res=>{
      if(res) {
        return this.http.get(`${this.host}${url}`,obj).toPromise()
      }else{
        this.router.navigate(['/welcome'], {})
        return null
      }
    })
    
  }
  // 
  post(url,body,options): any {
    let obj = Object.assign(body,{
      authorization: localStorage.getItem('si-token') || ''
    })
    let params = this.createFormData(obj)
    return this.checkToken().then(res=>{
      if(res) {
        return this.http.post(`${this.host}${url}`,params,options).toPromise()
      }else{
        this.router.navigate(['/welcome'], {})
        return null
      }
    })
    
  }

  createFormData(obj) {
    const formdata = new FormData()
    
    for (let key in obj) {	
      formdata.set(key,obj[key])		
      
    };
    return formdata
  }

}
