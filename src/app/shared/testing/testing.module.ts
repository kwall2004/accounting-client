import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialTestingModule } from './angular-material-testing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialTestingModule
  ],
  exports: [
    AngularMaterialTestingModule
  ]
})
export class TestingModule { }
