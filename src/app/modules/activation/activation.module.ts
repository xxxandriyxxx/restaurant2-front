import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivationRoutingModule } from './activation-routing.module';
import { ActivationPageComponent } from './activation-page/activation-page.component';

@NgModule({
  declarations: [ActivationPageComponent],
  imports: [
    CommonModule,
    ActivationRoutingModule
  ]
})
export class ActivationModule { }
