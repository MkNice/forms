import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { DestroyService } from '../../services/destroy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class HeaderComponent {

  constructor(public authService: AuthService, private readonly destroy$: DestroyService, private router: Router,) { }

  public logout(): void {
    this.authService.logout()
      .pipe(takeUntil(this.destroy$),
        catchError((err) => {
          return throwError(() => new Error(err));
        })).subscribe(() => {
          this.authService.isLoggedIn = false;
          this.router.navigate(['']);
        });
  }
}
