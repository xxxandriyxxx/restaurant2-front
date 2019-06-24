import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {Restaurant} from '../../../models/Restaurant';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  // showSigInMessage = false;
  restaurants: Restaurant[] = [];

  constructor(private mainService: MainService) {
  }

  ngOnInit() {

    // if (localStorage.getItem('_userId') == null) {
    //   this.showSigInMessage = true;
    // }
    this.mainService.getAllRestaurants()
      .subscribe((restaurants) => {
          this.restaurants = restaurants;
          console.log(restaurants);
        },
        error => {
          console.log(error);
        });
  }

}
