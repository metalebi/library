import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MagicCommonService {

  constructor() { }

  matProgressbar:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  showMatProgressbar(){
    this.matProgressbar.next(true);
  }
  hideMatProgressbar(){
    this.matProgressbar.next(false);
  }
}
