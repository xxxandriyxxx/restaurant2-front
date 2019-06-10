import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RestaurantPageComponent} from '../restaurant/restaurant-page/restaurant-page.component';
import {ClientPageComponent} from './client-page/client-page.component';

const routes: Routes = [
  {path: '', component: ClientPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
