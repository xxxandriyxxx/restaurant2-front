import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerPageComponent } from './owner-page/owner-page.component';

@NgModule({
  declarations: [OwnerPageComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
