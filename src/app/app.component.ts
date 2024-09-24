import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'oc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'onecompileman';
  hideNavbarFooter: boolean = false;
  routesToHideNavbar: string[] = ['login', 'admin'];

  constructor(private router: Router) {
    this.checkRoutes();
    this.listenToRouteChanges();
  }

  private listenToRouteChanges() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRoutes();
      });
  }

  private checkRoutes() {
    this.hideNavbarFooter = this.routesToHideNavbar.some((route) =>
      this.router.url.includes(route)
    );
  }
}
