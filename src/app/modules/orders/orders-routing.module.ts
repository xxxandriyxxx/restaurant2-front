import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import {NewOrderComponent} from './new-order/new-order.component';

const routes: Routes = [
  {
    path: ':whose', component: OrdersComponent, children: [
      {path: '', component: OrdersComponent},
    ]
  },
  {path: '', component: NewOrderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
