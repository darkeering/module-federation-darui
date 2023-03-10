import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation'

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CanActiveGuard } from './can-active.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TabsModule } from 'ng-devui/tabs';
import { ButtonModule } from 'ng-devui';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TabsModule,
    ButtonModule,
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
