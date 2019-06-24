import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { SingleRestaurantComponent } from './single-restaurant/single-restaurant.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

@NgModule({
  declarations: [SingleRestaurantComponent, RestaurantsComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule
  ],
  exports: [
    RestaurantsComponent,
    SingleRestaurantComponent
  ]
})
export class RestaurantsModule { }
