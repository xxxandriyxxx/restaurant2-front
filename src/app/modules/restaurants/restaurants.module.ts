import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleRestaurantComponent} from './single-restaurant/single-restaurant.component';
import {RestaurantsComponent} from './restaurants/restaurants.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwnerRoutingModule} from '../owner/owner-routing.module';
import {DialodComponent} from './dialod/dialod.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import {AppComponent} from '../../app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SingleRestaurantComponent, RestaurantsComponent, DialodComponent],
  imports: [
    CommonModule,
    FormsModule,
    OwnerRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule

    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRippleModule,
  ],
  exports: [
    RestaurantsComponent,
    SingleRestaurantComponent,
    DialodComponent,

    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRippleModule,
  ],

  entryComponents: [DialodComponent]
})
export class RestaurantsModule {
}
