import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MySingleRestaurantComponent} from './my-single-restaurant/my-single-restaurant.component';
import {MyRestaurantsComponent} from './my-restaurants/my-restaurants.component';


const routes: Routes = [
  {path: '', component: MyRestaurantsComponent},
  {path: ':id', component: MySingleRestaurantComponent},
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
