import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DestroyService } from 'src/app/shared/services/destroy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private readonly destroy$: DestroyService,
  ) { }

  public dataFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  public get emailControl() {
    return this.dataFormGroup.get('email');
  }

  public get passwordControl() {
    return this.dataFormGroup.get('password');
  }

  public onSubmit() {

  }
}
