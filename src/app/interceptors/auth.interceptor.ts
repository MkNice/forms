import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: HttpHeaders | undefined;

    if (this.auth.userData) {
      headers = new HttpHeaders({
        'Authorization': `${this.auth.userData.token_type} ${this.auth.userData.access_token}`
      });
    }

    return next.handle(
      request.clone({
        url: `${environment.server}${request.url}`,
        headers: headers,
      })
    );
  }
}
