import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders/orders.component';
import {NewOrderComponent} from './new-order/new-order.component';


@NgModule({
  declarations: [OrdersComponent, NewOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  exports: [
    OrdersComponent,
  ]
})
export class OrdersModule {
}
