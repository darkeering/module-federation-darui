import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedLibService {
  name = 'main SharedLibService'
  count = 0
  count$ = new BehaviorSubject<number>(this.count)
  constructor() { }

  setCount(count: number) {
    this.count = count
    this.count$.next(count)
  }
}
