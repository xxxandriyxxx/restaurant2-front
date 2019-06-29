import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { RestaurantsOrdersComponent } from './restaurants-orders/restaurants-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations: [RestaurantsOrdersComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  exports: [
    RestaurantsOrdersComponent,
    MyOrdersComponent
  ]
})
export class OrdersModule { }
