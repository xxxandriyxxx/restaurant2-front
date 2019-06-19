import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/Restaurant';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {HtmlAstPath} from '@angular/compiler';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  showAddRest = false;
  newRestaurant: Restaurant = new Restaurant();
  restaurants: Restaurant[] = [];


  constructor(private mainService: MainService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {

    const ownerId = localStorage.getItem('_userId');
    this.mainService.getRestaurants(ownerId)
      .subscribe((restaurants) => {

          this.restaurants = restaurants;
          console.log(restaurants);
          // this.router.navigate(['/myRestaurants']);
          // alert(value.message);

        },
        error => {
          console.log(error);
        });

  }


  addRestaurant() {
    const ownerId = localStorage.getItem('_userId');
    this.mainService.addRestaurant(ownerId, this.newRestaurant)
      .subscribe((value) => {


          console.log(value);
          // window.location.reload();
          // this.router.navigate(['/myRestaurants']);
          // alert(value.message);

        },
        error => {
          console.log(error);
        });
  }

}
