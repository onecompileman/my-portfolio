import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthDataService } from '../data-services/auth.data-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return new Observable((observer) => {
      if (this.authService.user$.getValue()) {
        observer.next(true);
        observer.complete();
      } else {
        this.authDataService.getActiveUser().subscribe(
          (user) => {
            this.authService.user$.next(user);
            observer.next(true);
            observer.complete();
          },
          (error) => {
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
            observer.next(false);
            observer.complete();
          }
        );
      }
    });
  }
}
