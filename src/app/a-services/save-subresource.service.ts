import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveSubresourceService {

  constructor() { }
  
  public instanceIds:any;

  setInstanceIds(ids) {
    this.instanceIds = ids
  }
  
  getInstanceIds() {
    return this.instanceIds
  }
}
