import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {ActivationPageComponent} from './activation-page/activation-page.component';

const routes: Routes = [
  {path: '', component: ActivationPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
