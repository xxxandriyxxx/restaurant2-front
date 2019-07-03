import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignupPageComponent} from './modules/signup/signup-page/signup-page.component';
import {SigninPageComponent} from './modules/signin/signin-page/signin-page.component';
import {AppComponent} from './app.component';
import {RestaurantsComponent} from './modules/restaurants/restaurants/restaurants.component';
import {SingleRestaurantComponent} from './modules/restaurants/single-restaurant/single-restaurant.component';
import {ProfileComponent} from './modules/profile/profile/profile.component';
import {AccountComponent} from './modules/account/account/account.component';
import {MySingleRestaurantComponent} from './modules/my-restaurants/my-single-restaurant/my-single-restaurant.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: '', component: RestaurantsComponent},
  {path: 'sign-up', component: SignupPageComponent},
  {path: 'sign-in', component: SigninPageComponent},
  {path: 'restaurants/:id', component: SingleRestaurantComponent},
  {path: 'myAccount', loadChildren: './modules/account/account.module#AccountModule'},
  // {path: 'myAccount', component: AccountComponent},
  {path: 'myRestaurants', loadChildren: './modules/my-restaurants/my-restaurants.module#MyRestaurantsModule'},
  {path: 'orders', loadChildren: './modules/orders/orders.module#OrdersModule'},

  // {path: 'myRestaurants/:id', loadChildren: './modules/my-restaurants/my-restaurants.module#MyRestaurantsModule'},


  {path: 'client', loadChildren: './modules/client/client.module#ClientModule'},
  {path: 'owner', loadChildren: './modules/owner/owner.module#OwnerModule'
    // , children:
    //   [
    //     {path: 'profile', component: ProfileComponent},
    //     {path: 'clientsOrders', component: ClientsOredersComponent},
    //     {path: 'myOrders', component: MyOredersComponent},
    //     {
    //       path: 'restaurants', component: MyRestaurantsComponent, children:
    //         [
    //           {path: 'addRestaurant', component: AddRestaurantComponent}
    //         ]
    //     }
    //
    //   ]
  },
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
