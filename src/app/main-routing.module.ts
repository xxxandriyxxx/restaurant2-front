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
  {path: 'owner', loadChildren: './modules/owner/owner.module#OwnerModule'},
  {path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule'},
  {path: 'restaurant', loadChildren: './modules/restaurant/restaurant.module#RestaurantModule'},
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
