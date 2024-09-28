import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('authToken');
    this.user$.next(null);

    this.router.navigate(['/login']);
  }
}
