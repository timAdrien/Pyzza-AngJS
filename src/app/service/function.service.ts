import { Injectable } from '@angular/core';

@Injectable()
export class FunctionService {

  constructor() { }

  getDiff(obj1, obj2){
    let newJson = { _id: obj2["_id"]};

    for(let property in obj1) {
      if (obj1[property] !=  obj2[property]) {
        newJson[property] = obj2[property];
      }
    }
    return newJson;
  }

}
