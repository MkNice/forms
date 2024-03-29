import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthFieldsData, IUserData } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) { }

  public login(dataForm: IAuthFieldsData): Observable<IUserData> {
    const body = {
      email: dataForm.email,
      password: dataForm.password,
    };

    const url = '/auth/login';

    return this.http.post<IUserData>(url, body);
  }

  public logout() {
    return this.http.post('/auth/logout', {},)
  }

  public refreshToken(): Observable<IUserData> {
    return this.http.post<IUserData>('/auth/refresh', {});
  }
}
