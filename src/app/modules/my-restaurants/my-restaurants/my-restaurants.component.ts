import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/Restaurant';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {HtmlAstPath} from '@angular/compiler';

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.css']
})
export class MyRestaurantsComponent implements OnInit {


  newRestaurant: Restaurant = new Restaurant();
  // changeRestaurant: Restaurant [] = [];
  restaurants: Restaurant[] = [];
  showAddRest = false;
  showChangeRest: boolean [] = [];

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
          this.ngOnInit();
          this.showAddRest = false;
        },
        error => {
          console.log(error);
        });
  }

  changeRestaurant(rest: Restaurant) {
    console.log(rest);
    this.mainService.changeRestaurant(rest)
      .subscribe((value) => {
          console.log(value);
          this.showChangeRest[rest.id] = false;
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }

  deleteRestaurant(id: number) {
    this.mainService.deleteRestaurant(id)
      .subscribe((value) => {
          console.log(value);
          this.ngOnInit();
          // this.showChangeRest[rest.id] = false;
        },
        error => {
          console.log(error);
        });
  }








}
