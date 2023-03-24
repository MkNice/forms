import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IUserData } from '../interfaces/auth.interface';
import { AuthApiService } from './auth-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  public userData!: IUserData;

  constructor(private authApi: AuthApiService, private localStorageService: LocalStorageService, private router: Router) {
    const data = this.localStorageService.getData('userData');
    this.userData = data as IUserData;
    this.isLoggedIn = !!data;
    this.isLoggedIn && this.router.navigate(['/dashboard']);
  }

  public logout(): Observable<any> {
    return this.authApi.logout()
      .pipe(
        tap(() => this.localStorageService.clearData())
      );
  }
}