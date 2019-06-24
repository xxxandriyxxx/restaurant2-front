import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {OwnerPageComponent} from './owner-page/owner-page.component';


import {OrdersModule} from '../orders/orders.module';
import {OrdersComponent} from '../orders/orders/orders.component';
import {ProfileComponent} from '../profile/profile/profile.component';
import {MyRestaurantsComponent} from '../my-restaurants/my-restaurants/my-restaurants.component';
import {MySingleRestaurantComponent} from '../my-restaurants/my-single-restaurant/my-single-restaurant.component';

const routes: Routes = [
  {
    path: '', component: OwnerPageComponent, children:
      [
        {path: 'myProfile', component: ProfileComponent},
        {path: 'myRestaurants', component: MyRestaurantsComponent},
        {path: 'myRestaurants/:id', component: MySingleRestaurantComponent},
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
