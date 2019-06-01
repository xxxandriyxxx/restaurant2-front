import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignupPageComponent} from './modules/signup/signup-page/signup-page.component';
import {SigninPageComponent} from './modules/signin/signin-page/signin-page.component';


const routes: Routes = [
  {path: 'sign-up', component: SignupPageComponent},
  {path: 'sign-in', component: SigninPageComponent},
  {path: 'restaurant', loadChildren: './modules/restaurant/restaurant.module#RestaurantModule'}

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
