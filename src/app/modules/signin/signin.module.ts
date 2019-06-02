import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SigninPageComponent} from './signin-page/signin-page.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [SigninPageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SigninPageComponent
  ]
})
export class SigninModule {
}
