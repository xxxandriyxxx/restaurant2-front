import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignupPageComponent} from './modules/signup/signup-page/signup-page.component';
import {SigninPageComponent} from './modules/signin/signin-page/signin-page.component';
import {AppComponent} from './app.component';
import {RestaurantsComponent} from './modules/restaurants/restaurants/restaurants.component';
import {SingleRestaurantComponent} from './modules/restaurants/single-restaurant/single-restaurant.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: '', component: RestaurantsComponent},
  {path: 'sign-up', component: SignupPageComponent},
  {path: 'sign-in', component: SigninPageComponent},
  {path: 'rest/:id', component: SingleRestaurantComponent},

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
