import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SignupModule} from './modules/signup/signup.module';
import {SigninModule} from './modules/signin/signin.module';
import {MainRoutingModule} from './main-routing.module';
import {FormsModule} from '@angular/forms';
import {RestaurantsModule} from './modules/restaurants/restaurants.module';
import {AboutModule} from './modules/about/about.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MainRoutingModule,
    AboutModule,
    SignupModule,
    SigninModule,
    RestaurantsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
