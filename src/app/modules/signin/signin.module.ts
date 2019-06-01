import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SigninPageComponent} from './signin-page/signin-page.component';

@NgModule({
  declarations: [SigninPageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SigninPageComponent
  ]
})
export class SigninModule {
}
