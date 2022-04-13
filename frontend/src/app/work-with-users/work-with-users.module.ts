import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { CoreModule } from '../core/core.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManageUsersPageComponent } from './pages/manage-users-page/manage-users-page.component';
import { FakeUserService } from './services/fake-user.service';
import { UserService } from './services/user.service';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersPageComponent
  }
];

@NgModule({
  declarations: [LoginPageComponent, ManageUsersPageComponent],
  imports: [CoreModule, CommonModule, RouterModule.forChild(routes)],
  providers: [{ provide: UserService, useClass: environment.useDevMode ? FakeUserService : UserService }]
})
export class WorkWithUsersModule {}
