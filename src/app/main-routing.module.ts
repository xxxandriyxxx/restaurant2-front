import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignupPageComponent} from './modules/signup/signup-page/signup-page.component';
import {SigninPageComponent} from './modules/signin/signin-page/signin-page.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'sign-up', component: SignupPageComponent},
  {path: 'sign-in', component: SigninPageComponent},
  {path: 'client', loadChildren: './modules/client/client.module#ClientModule'},
  {
    path: 'owner', loadChildren: './modules/owner/owner.module#OwnerModule'
    // , children:
    //   [
    //     {path: 'profile', component: ProfileComponent},
    //     {path: 'clientsOrders', component: ClientsOredersComponent},
    //     {path: 'myOrders', component: MyOredersComponent},
    //     {
    //       path: 'restaurants', component: RestaurantsComponent, children:
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
