import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SignupModule} from './modules/signup/signup.module';
import {SigninModule} from './modules/signin/signin.module';
import {MainRoutingModule} from './main-routing.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RestaurantsModule} from './modules/restaurants/restaurants.module';
import {WINDOW_PROVIDERS} from './navigation/BrowserWindowRef';
import {ProfileModule} from './modules/profile/profile.module';
import {AccountModule} from './modules/account/account.module';
import {MyRestaurantsModule} from './modules/my-restaurants/my-restaurants.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MainRoutingModule,
    SignupModule,
    SigninModule,
    BrowserAnimationsModule,
    RestaurantsModule,
    // ProfileModule
    // MyRestaurantsModule


  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}
