import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/Restaurant';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService,
              private router: Router,
              private dataService: DataService) {
  }


  ngOnInit() {
    this.restaurantService.getAllRestaurants()
      .subscribe((restaurants) => {
          this.restaurants = restaurants;
          console.log(restaurants);
        },
        error => {
          console.log(error);
        });
  }


  goToRestaurant(id, restName) {
    this.router.navigate(['restaurants/' + id], {queryParams: {name: restName}});
  }

}
