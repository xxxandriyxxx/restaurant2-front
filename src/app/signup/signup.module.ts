import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './signup-page/signup-page.component';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule
  ],
  exports:[
    SignupPageComponent
  ]
})
export class SignupModule { }
