import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebouncerService {

  private subject = new Subject<{func: Function, args: any[]}>();

  constructor() { 
    this.subject.pipe(debounceTime(500)).subscribe(({ func, args }) => func(...args));
  }


  debounce(func: (...args: any[]) => void, wait: number) {
    return (...args: any[]) => {
      this.subject.next({ func, args });
    };
  }
}
