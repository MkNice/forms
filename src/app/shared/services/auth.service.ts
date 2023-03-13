import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { IFormsData } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  public userData: any = '';

  constructor(private readonly http: HttpClient) { }

  public login(dataForm: IFormsData) {
    const body = {
      email: dataForm.email,
      password: dataForm.password,
    };

    return this.http.post('/auth/login', body);
  }

  public logout() {


    return this.http.post('/auth/logout', {},);
  }

  public getForms() {

  
    return this.http.get('/form_fields?page=1&per_page=20&order_by=id&order_direction=asc')
  }
}

/*
  curl -XPOST -d '{
    "email": "test@test.com",
    "password": "123456"
  };' 'https://test.s-group.vn.ua/api/v1/auth/login'
    const headers = new HttpHeaders({
      'Authorization': '${this.userData.token_type} ${this.userData.access_token}'
    });
*/;