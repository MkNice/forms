import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './modules/login/login.component';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthLayoutComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
