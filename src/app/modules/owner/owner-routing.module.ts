import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RestaurantPageComponent} from '../restaurant/restaurant-page/restaurant-page.component';
import {OwnerPageComponent} from './owner-page/owner-page.component';

const routes: Routes = [
  {path: '', component: OwnerPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule {
}
