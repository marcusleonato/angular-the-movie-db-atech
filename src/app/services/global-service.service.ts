import { Injectable } from '@angular/core';

@Injectable()
export class GlobalServicesFuctions {

  constructor() { }

  getColorRating(value){
    if(value >= 70){
      return 'spinner-green';
    }else {
      return 'spinner-orange';
    }
  }

}
