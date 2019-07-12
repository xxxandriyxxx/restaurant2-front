import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MySingleRestaurantComponent} from './my-single-restaurant/my-single-restaurant.component';
import {MyRestaurantsComponent} from './my-restaurants/my-restaurants.component';
import {FormsModule} from '@angular/forms';
import {MyRestaurantsRoutingModule} from './my-restaurants-routing.module';


@NgModule({
  declarations: [MySingleRestaurantComponent, MyRestaurantsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MyRestaurantsRoutingModule
  ],
  exports: [
    MyRestaurantsComponent,
    MySingleRestaurantComponent,
  ]
})
export class MyRestaurantsModule {
}
