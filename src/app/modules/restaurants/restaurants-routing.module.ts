import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OwnerPageComponent} from '../owner/owner-page/owner-page.component';
import {SingleRestaurantComponent} from './single-restaurant/single-restaurant.component';
import {RestaurantsComponent} from './restaurants/restaurants.component';



const routes: Routes = [
  {
    path: '', component: RestaurantsComponent, children:
      [
        {path: ':id', component: SingleRestaurantComponent},
      ]
  },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule {
}
