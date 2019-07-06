import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MySingleRestaurantComponent} from './my-single-restaurant/my-single-restaurant.component';
import {MyRestaurantsComponent} from './my-restaurants/my-restaurants.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwnerRoutingModule} from '../owner/owner-routing.module';
// import {DialodComponent} from './dialod/dialod.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import {AppComponent} from '../../app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MyRestaurantsRoutingModule} from './my-restaurants-routing.module';


@NgModule({
  declarations: [MySingleRestaurantComponent, MyRestaurantsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MyRestaurantsRoutingModule
  ],
  exports: [
    MyRestaurantsComponent,
    MySingleRestaurantComponent,
  ]
})
export class MyRestaurantsModule {
}
