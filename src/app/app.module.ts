import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './shared/services/auth.service';
import { IUserData } from './shared/interfaces/auth.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from './shared/services/local-storage.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (authService: AuthService, router: Router, localStorageService: LocalStorageService) => () => {
    //     const userDataString = localStorageService.getData('userData');
    //     if (userDataString) {
    //       authService.isLoggedIn = true;

    //       authService.userData = userDataString as IUserData;
    //       router.navigate(['/dashboard']);
    //     }
    //   },
    //   deps: [AuthService, Router, LocalStorageService],
    //   multi: true
    // },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }