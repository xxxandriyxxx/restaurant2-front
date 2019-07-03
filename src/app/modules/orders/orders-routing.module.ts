import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyRestaurantsComponent} from '../my-restaurants/my-restaurants/my-restaurants.component';
import {MySingleRestaurantComponent} from '../my-restaurants/my-single-restaurant/my-single-restaurant.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [

  {
    path: ':whose', component: OrdersComponent
    , children:
      [
        {path: '', component: OrdersComponent},
      ]
  },
  // {path: ':whose', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
