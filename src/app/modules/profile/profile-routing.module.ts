import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: '', component: ProfileComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {

}
