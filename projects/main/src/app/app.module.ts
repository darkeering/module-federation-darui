import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation'

import { AppComponent } from './app.component';
import { LeaveGuard } from './leave.guard';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanActiveGuard } from './can-active.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';

// window.addEventListener('popstate', () => {
//   console.log(111);

// })

// const rawPushState = window.history.pushState

// window.history.pushState = (...args) => {
//   rawPushState.apply(window.history.pushState, args)
//   console.log(222);

// }

// const rawReplaceState= window.history.replaceState

// window.history.replaceState = (...args) => {
//   rawReplaceState.apply(window.history.replaceState, args)
//   console.log(333);

// }

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [CanActiveGuard],
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'mfe1',
        loadChildren: () => import('mfe1/Module').then(m => m.ChartsModule)
      },
      {
        path: 'mfe2',
        // canDeactivate: [LeaveGuard],
        loadChildren: () => loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4202/remoteEntry.js',
          exposedModule: './AppModule',
        }).then(m => m.AppModule)
      },
      {
        path: '**',
        canActivate: [CanActiveGuard],
        component: NotfoundComponent
      }
    ])
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
