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

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = inject(AuthService);

    const headers = new HttpHeaders({
      'Authorization': `${auth.userData.token_type} ${auth.userData.access_token}`
    });

    return next.handle(
      request.clone({
        url: `${environment.server}${request.url}`,
        headers: headers,
      })
    );
  }
}
