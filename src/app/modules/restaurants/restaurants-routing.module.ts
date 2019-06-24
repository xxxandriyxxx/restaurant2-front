import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RestaurantsComponent} from './restaurants/restaurants.component';
import {SingleRestaurantComponent} from './single-restaurant/single-restaurant.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
