import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {OwnerPageComponent} from './owner-page/owner-page.component';


import {OrdersModule} from '../orders/orders.module';
import {OrdersComponent} from '../orders/orders/orders.component';
import {ProfileComponent} from '../profile/profile/profile.component';
import {RestaurantsComponent} from '../restaurants/restaurants/restaurants.component';
import {SingleRestaurantComponent} from '../restaurants/single-restaurant/single-restaurant.component';

const routes: Routes = [
  {
    path: '', component: OwnerPageComponent, children:
      [
        {path: 'myProfile', component: ProfileComponent},
        {path: 'myRestaurants', component: RestaurantsComponent},
        {path: 'myRestaurants/:id', component: SingleRestaurantComponent},
        {path: 'orders', component: OrdersComponent}

      ]
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule {
}
