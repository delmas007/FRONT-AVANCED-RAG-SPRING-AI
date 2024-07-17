import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes} from '@angular/router';
import { Observable } from 'rxjs';
import {StateService} from "../service/state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(private state:StateService,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.state.authState.role == "ADMIN" || this.state.authState.role == "USER") {
      return true;
    } else {
      this.router.navigateByUrl("/notAuthorized");
      return false;
    }
  }
}
