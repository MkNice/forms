import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpContextToken
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarOptions } from '../dashboard/constants/constants';


export interface IResponseError {
  message: string;
}

export const NOTIFY_ERROR = new HttpContextToken<boolean>(() => true);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResp => {
        if (errorResp instanceof HttpErrorResponse && request.context.get(NOTIFY_ERROR)) {
          const error: IResponseError = errorResp;

          this._snackBar.open(error.message, 'Ошибка', ErrorSnackbarOptions);
        }

        return throwError(() => new Error(errorResp));;
      })
    );
  }
}
