import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignupPageComponent} from './modules/signup/signup-page/signup-page.component';
import {SigninPageComponent} from './modules/signin/signin-page/signin-page.component';
import {AppComponent} from './app.component';
import {RestaurantsComponent} from './modules/restaurants/restaurants/restaurants.component';
import {SingleRestaurantComponent} from './modules/restaurants/single-restaurant/single-restaurant.component';
import {AboutComponent} from './modules/about/about/about.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: '', component: RestaurantsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'sign-up', component: SignupPageComponent},
  {path: 'sign-in', component: SigninPageComponent},
  {path: 'restaurants/:id', component: SingleRestaurantComponent},
  {path: 'myAccount', loadChildren: './modules/account/account.module#AccountModule'},
  {path: 'myRestaurants', loadChildren: './modules/my-restaurants/my-restaurants.module#MyRestaurantsModule'},
  {path: 'orders', loadChildren: './modules/orders/orders.module#OrdersModule'},
  {path: 'newOrder', loadChildren: './modules/orders/orders.module#OrdersModule'},
  {path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule'},
  {path: 'activation/:jwt', loadChildren: './modules/activation/activation.module#ActivationModule'}

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
