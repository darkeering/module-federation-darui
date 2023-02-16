import { Component } from '@angular/core';
import { SharedLibService } from 'projects/shared-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'main';
  name = ''
  count = 0
  constructor(
    private sharedLibService: SharedLibService
  ) {
    this.name = this.sharedLibService.name
    this.sharedLibService.count$.subscribe(count => {
      this.count = count
    })
  }
  onclick() {
    this.sharedLibService.setCount(this.count + 1)
  }
}
