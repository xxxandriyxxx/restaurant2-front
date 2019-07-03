import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MySingleRestaurantComponent} from './my-single-restaurant/my-single-restaurant.component';
import {MyRestaurantsComponent} from './my-restaurants/my-restaurants.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwnerRoutingModule} from '../owner/owner-routing.module';
import {DialodComponent} from './dialod/dialod.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import {AppComponent} from '../../app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MyRestaurantsRoutingModule} from './my-restaurants-routing.module';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MySingleRestaurantComponent, MyRestaurantsComponent, DialodComponent],
  imports: [
    CommonModule,
    FormsModule,
    // OwnerRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    MyRestaurantsRoutingModule

    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRippleModule,
  ],
  exports: [
    MyRestaurantsComponent,
    MySingleRestaurantComponent,
    DialodComponent,

    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRippleModule,
  ],

  entryComponents: [DialodComponent]
})
export class MyRestaurantsModule {
}
