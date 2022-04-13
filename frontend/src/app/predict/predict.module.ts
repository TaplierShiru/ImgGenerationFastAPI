import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { CoreModule } from '../core/core.module';
import { UtilsModule } from '../utils/utils.module';
import { PredictPageComponent } from './pages/predict-page/predict-page.component';
import { FakeModelService } from './services/model.fake.service';
import { ModelService } from './services/model.service';

const routes: Routes = [
  {
    path: '',
    component: PredictPageComponent
  }
];

@NgModule({
  declarations: [PredictPageComponent],
  imports: [CoreModule, UtilsModule, CommonModule, RouterModule.forChild(routes)],
  providers: [{ provide: ModelService, useClass: environment.useDevMode ? FakeModelService : ModelService }]
})
export class PredictModule {}
