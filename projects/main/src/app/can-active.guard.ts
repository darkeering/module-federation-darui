import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuard implements CanActivate {
  constructor(
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentMfe = this.router.url.split('/')[1]
    if (currentMfe === '') {
      if (state.url !== '/') {
        const hasFind = this.router.config.find(r => r.path === currentMfe)
        if (hasFind) {
          const url = `${'/' + currentMfe}${state.url}`
          this.router.navigate([url])
          return false
        }
      }
    } else {
      const hasFind = this.router.config.find(r => r.path === currentMfe)
      if (hasFind) {
        const url = `${'/' + currentMfe}${state.url}`
        this.router.navigate([url])
        return false
      }
    }
    return true
  }

}
