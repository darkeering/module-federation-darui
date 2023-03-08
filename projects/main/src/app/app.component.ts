import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


    window.addEventListener('popstate', () => {
      console.log(111);

    })

    // const rawPushState = window.history.pushState
    // console.log(rawPushState);
    

    // window.history.pushState = (...args) => {
    //   rawPushState.apply(window.history.pushState, args)
    //   debugger
    //   this.router.navigateByUrl('/mfe1')
    //   console.log(args);
    //   history.pushState()
    // }

    // const rawReplaceState = window.history.replaceState

    // window.history.replaceState = (...args) => {
    //   rawReplaceState.apply(window.history.replaceState, args)
    //   console.log(333);

    // }
  }
  onclick() {
    this.sharedLibService.setCount(this.count + 1)
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
    // this.router.resetConfig([
    //   {
    //     path: '',
    //     loadChildren: () => loadRemoteModule({
    //       type: 'module',
    //       remoteEntry: `${this.remoteEntry}/remoteEntry.js`,
    //       exposedModule: this.exposedModule,
    //     }).then(m => m[this.entryModule])
    //   }
    // ])
    this.router.navigate(['/mfe2'])
  }
}
