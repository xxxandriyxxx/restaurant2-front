import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {OwnerPageComponent} from './owner-page/owner-page.component';



import {ProfileComponent} from '../profile/profile/profile.component';
import {MyRestaurantsComponent} from '../my-restaurants/my-restaurants/my-restaurants.component';
import {MySingleRestaurantComponent} from '../my-restaurants/my-single-restaurant/my-single-restaurant.component';
import {MyOrdersComponent} from '../orders1/my-orders/my-orders.component';
import {RestaurantsOrdersComponent} from '../orders1/restaurants-orders/restaurants-orders.component';

const routes: Routes = [
  {
    path: '', component: OwnerPageComponent, children:
      [
        {path: 'myProfile', component: ProfileComponent},
        {path: 'myRestaurants', component: MyRestaurantsComponent},
        {path: 'myRestaurants/:id', component: MySingleRestaurantComponent},
        {path: 'restaurantsOrders', component: RestaurantsOrdersComponent},
        {path: 'myOrders', component: MyOrdersComponent}


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
