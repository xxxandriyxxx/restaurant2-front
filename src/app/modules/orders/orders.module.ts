import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from './orders/orders.component';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule
  ],
  exports: [OrdersComponent]
})
export class OrdersModule {
}
