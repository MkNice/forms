import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { IUserData } from 'src/app/shared/interfaces/auth.interface';
import { AuthApiService } from 'src/app/shared/services/auth-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DestroyService } from 'src/app/shared/services/destroy.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],

})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private readonly destroy$: DestroyService,
  ) { }

  public dataFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  public onSubmit() {
    this.authApiService.login(this.dataFormGroup.value)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((userData: IUserData) => {
        this.authService.userData = userData;
        this.localStorageService.setData('userData', userData);
        this.authService.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      });
  }
}