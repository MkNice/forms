import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { IAuthFieldsData, IForms, IPaginationData } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  public userData: any = '';

  constructor(private readonly http: HttpClient) { }

  public login(dataForm: IAuthFieldsData) {
    const body = {
      email: dataForm.email,
      password: dataForm.password,
    };

    const url = '/auth/login';

    return this.http.post(url, body);
  }

  public logout() {


    return this.http.post('/auth/logout', {},);
  }
  //  let url = '/forms?page=1&per_page=20&order_by=id&order_direction=asc';
  public getForms(params: PageEvent | IPaginationData): Observable<IForms> {
    const url = `/forms?page=${params.pageIndex}&per_page=${params.pageSize}`;

    return this.http.get<IForms>(url);
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