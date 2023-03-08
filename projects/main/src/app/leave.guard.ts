import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveGuard implements CanDeactivate<unknown> {
  constructor(
    private router: Router
  ) {}
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('component', component);
      console.log('currentRoute', currentRoute);
      console.log('currentState', currentState);
      console.log('nextState', nextState);
      this.router.navigate([`/${currentRoute.routeConfig?.path}${nextState?.url}`])
    return false;
  }
  
}
