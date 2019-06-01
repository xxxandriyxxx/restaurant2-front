import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupPageComponent} from './signup-page/signup-page.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    // HttpClientModule,
    // BrowserModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    SignupPageComponent
  ]
})
export class SignupModule {
}
