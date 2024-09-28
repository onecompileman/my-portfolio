import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { BlogDataService } from '../data-services/blog.data-service';
import { Blog } from '../../shared/models/blog.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BlogDetailResolver implements Resolve<Blog> {
  constructor(private blogDataService: BlogDataService, private spinner: NgxSpinnerService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Blog> {
    this.spinner.show();
    return this.blogDataService.getBlogById(route.params['id']).pipe(
      tap(() => this.spinner.hide())
    );
  }
}
