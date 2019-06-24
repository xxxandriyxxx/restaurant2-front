import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OwnerRoutingModule} from './owner-routing.module';
import {OwnerPageComponent} from './owner-page/owner-page.component';
import {OrdersModule} from '../orders/orders.module';
import {ProfileModule} from '../profile/profile.module';
import {MyRestaurantsModule} from '../my-restaurants/my-restaurants.module';


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
