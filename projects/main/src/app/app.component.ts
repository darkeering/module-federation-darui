import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedLibService } from '@darkeering/shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tabActiveId: string | number = 'mfe1';
  tabItems = [
    // {
    //   id: '',
    //   title: 'home',
    // },
    {
      id: 'mfe1',
      title: 'mfe1',
    },
    {
      id: 'mfe2',
      title: 'mfe2',
    },
  ];
  title = 'main';
  name = ''
  count = 0

  remoteEntry = 'http://localhost:4202'
  exposedModule = './AppModule'
  entryModule = 'AppModule'

  constructor(
    private sharedLibService: SharedLibService,
    private router: Router
  ) {
    this.name = this.sharedLibService.name
    this.sharedLibService.count$.subscribe(count => {
      this.count = count
    })
  }

  activeTabChange(tab: any) {
    console.log(tab);
    
    this.router.navigate([`/${tab}`])
  }

  setCount(count: any) {
    this.sharedLibService.setCount(count)
  }

  loadHome() {
    this.router.resetConfig([
      {
        path: '',
        loadChildren: () => loadRemoteModule({
          type: 'module',
          remoteEntry: `${this.remoteEntry}/remoteEntry.js`,
          exposedModule: this.exposedModule,
        }).then(m => m[this.entryModule])
      }
    ])
    this.router.navigate(['/'])
  }

  loadMfe() {
    this.router.navigate(['/mfe2'])
  }
}
