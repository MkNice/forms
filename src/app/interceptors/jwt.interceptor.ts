import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { AuthApiService } from '../shared/services/auth-api.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authApiService: AuthApiService, private authService: AuthService) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResp => {

        if (errorResp.status === 401) {
          return this.authApiService.refreshToken()
            .pipe(
              switchMap((response) => {
                this.authService.userData.access_token = response.access_token;

                return next.handle(
                  request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${response.access_token}`)
                  })
                );
              })
            );
        }
        return throwError(() => errorResp);;
      })
    );
  }
}