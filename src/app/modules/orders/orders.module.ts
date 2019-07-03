import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations: [OrdersComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  exports: [
    OrdersComponent,
    MyOrdersComponent
  ]
})
export class OrdersModule { }
