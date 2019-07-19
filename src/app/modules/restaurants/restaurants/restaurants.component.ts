import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {Restaurant} from '../../../models/Restaurant';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  // showSigInMessage = false;
  restaurants: Restaurant[] = [];

  constructor(private mainService: MainService,
              private router: Router) {
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

  goToRestaurant(id, restName) {
    this.router.navigate(['restaurants/' + id], {queryParams: {name: restName}});

  }

}
