import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RestaurantPageComponent} from './restaurant-page/restaurant-page.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', component: RestaurantPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
