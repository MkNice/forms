import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { isAuth } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/modules/login/login.module').then(m => m.LoginModule) },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [isAuth],
  },
  { path: 'forms', loadChildren: () => import('./dashboard/forms/forms.module').then(m => m.FormsModule) },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
