import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UtilsModule } from '../utils/utils.module';
import { StartPageComponent } from './start-page.component';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent
  }
];

@NgModule({
  declarations: [StartPageComponent],
  imports: [CommonModule, UtilsModule, RouterModule.forChild(routes)]
})
export class StartPageModule {}
