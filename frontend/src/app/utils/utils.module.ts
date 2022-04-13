import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../shared/angular-material.module';
import { NotFoundPageComponent } from './components/not-found/not-found-page.component';

/**
 * Utility module which may be used across many different components
 */
@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule],
  exports: [NotFoundPageComponent, MaterialModule, TranslateModule]
})
export class UtilsModule {}
