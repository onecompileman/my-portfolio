import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('authToken');
    let clonedRequest = request.clone();
    if (
      !request.url.startsWith('http') &&
      !request.url.startsWith(environment.apiEndpoint)
    ) {
      // Clone the request and modify the URL
      clonedRequest = request.clone({
        url: `${environment.apiEndpoint}/${request.url}`,
      });
    }

    if (token) {
      // Clone the request and add the authorization header
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // If no token, just pass the request as is
    return next.handle(clonedRequest);
  }
}
