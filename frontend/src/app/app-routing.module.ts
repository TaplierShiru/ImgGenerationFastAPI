import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasePageComponent } from './core/base-page/base-page.component';
import { AuthGuard } from './core/services/auth.guard';
import { NotFoundPageComponent } from './utils/components/not-found/not-found-page.component';
import { LoginPageComponent } from './work-with-users/pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPageComponent
  },
  {
    path: '',
    component: BasePageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'start-page',
        pathMatch: 'full'
      },
      {
        path: 'start-page',
        loadChildren: () => import('./start-page/start-page.module').then(m => m.StartPageModule)
      },
      {
        path: 'predict',
        loadChildren: () => import('./predict/predict.module').then(m => m.PredictModule)
      },
      {
        path: 'user-control',
        loadChildren: () => import('./work-with-users/work-with-users.module').then(m => m.WorkWithUsersModule)
      }
    ]
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    component: NotFoundPageComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
