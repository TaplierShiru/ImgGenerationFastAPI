import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UtilsModule } from '../utils/utils.module';
import { BasePageComponent } from './base-page/base-page.component';
import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [BasePageComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, UtilsModule],
  exports: [FormsModule, ReactiveFormsModule, UtilsModule],
  providers: [AuthenticationService, AuthGuard]
})
export class CoreModule {}
