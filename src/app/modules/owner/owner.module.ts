import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OwnerRoutingModule} from './owner-routing.module';
import {OwnerPageComponent} from './owner-page/owner-page.component';
import {ProfileModule} from '../profile/profile.module';
import {MyRestaurantsModule} from '../my-restaurants/my-restaurants.module';
import {OrdersModule} from '../orders1/orders.module';


@NgModule({
  declarations: [OwnerPageComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ProfileModule,
    MyRestaurantsModule,
    OrdersModule
  ]
})
export class OwnerModule {
}
