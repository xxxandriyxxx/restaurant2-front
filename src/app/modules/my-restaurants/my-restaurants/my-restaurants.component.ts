import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/Restaurant';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {HtmlAstPath, identifierModuleUrl} from '@angular/compiler';
import {getTemplateUrl} from 'codelyzer/util/ngQuery';

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.css']
})
export class MyRestaurantsComponent implements OnInit {

  span;
  modal;

  operationName = '';
  // var btn = document.getElementById("myBtn");

  newRestaurant: Restaurant = new Restaurant();
  restaurantName = this.newRestaurant.name;

  // changeRestaurant: Restaurant [] = [];
  restaurants: Restaurant[] = [];
  // showAddRest = false;
  showAddButton = false;
  showChangeButton = false;
  notification = '';

  // showChangeRest: boolean [] = [];

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

    this.span = document.getElementsByClassName('closeAddChangeRest')[0];
    this.modal = document.getElementById('modalAddChangeRest');

  }


  addRestaurant() {
    const ownerId = localStorage.getItem('_userId');
    this.newRestaurant.id = null;
    this.mainService.addRestaurant(ownerId, this.newRestaurant)
      .subscribe((value) => {
          console.log(value);
          // window.location.reload();
          // this.router.navigate(['/myRestaurants']);
          // alert(value.message);
          // this.showAddRest = false;
          // this.newRestaurant = new Restaurant();
          this.modal.style.display = 'none';
          this.ngOnInit();

        },
        error => {
          console.log(error);
        });
  }

  goToRestaurant(id: number) {
    this.router.navigate(['myRestaurants/' + id]);
  }


  changeRestaurant() {
    this.mainService.changeRestaurant(this.newRestaurant)
      .subscribe((value) => {
          console.log(value);
          this.modal.style.display = 'none';

          // this.showChangeRest[rest.id] = false;
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

  showAddRest() {
    this.operationName = 'Add restaurant';
    this.restaurantName = '';
    this.notification = 'You may add restaurants with the same names, but then their addresses must be different.';
    this.showAddButton = true;
    this.showChangeButton = false;
    this.showModalAddChangeRest();

  }

  showChangeRest(rest: Restaurant) {
    this.newRestaurant.id = rest.id;
    this.newRestaurant.name = rest.name;
    this.newRestaurant.address = rest.address;
    this.newRestaurant.phoneNumber = rest.phoneNumber;
    this.newRestaurant.about = rest.about;
    this.operationName = 'Change restaurant';
    this.restaurantName = this.newRestaurant.name;
    this.notification = '';
    this.showChangeButton = true;
    this.showAddButton = false;
    this.showModalAddChangeRest();
  }


  showModalAddChangeRest() {
    this.modal.style.display = 'block';
  }

  closeModalAddChangeRest() {
    this.modal.style.display = 'none';
  }


}
