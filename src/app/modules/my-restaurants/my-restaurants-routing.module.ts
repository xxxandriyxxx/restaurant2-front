import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OwnerPageComponent} from '../owner/owner-page/owner-page.component';
import {MySingleRestaurantComponent} from './my-single-restaurant/my-single-restaurant.component';
import {MyRestaurantsComponent} from './my-restaurants/my-restaurants.component';



const routes: Routes = [
  {
    path: '', component: MyRestaurantsComponent, children:
      [
        {path: ':id', component: MySingleRestaurantComponent},
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
export class MyRestaurantsRoutingModule {
}
