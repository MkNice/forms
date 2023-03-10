import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { IFormsData } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public login(dataForm: IFormsData) {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('X-CSRF-TOKEN', '');

    const body = {
      email: "test1@test.com",
      password: "asdTjdgfbn36km"
    };

    return this.http.post(`${environment.server}/auth/login`, body, { headers });
  }

  public logout() {
    console.log('logout success');
    return this.http.post(`${environment.server}/auth/logout`, {});
  }
}
