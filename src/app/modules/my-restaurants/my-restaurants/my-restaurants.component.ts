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
  restaurants: Restaurant[] = [];
  operationName = '';
  notification = '';
  restaurantName = '';
  newRestaurant: Restaurant = new Restaurant();
  restaurantForChange: Restaurant = new Restaurant();
  showAddRest: boolean;
  showChangeRest: boolean;

  // changeRestaurant: Restaurant [] = [];
  // showChangeRest: boolean [] = [];
  address = '';
  name = '';


  constructor(private mainService: MainService,
              private dataService: DataService,
              private router: Router) {
  }


  ngOnInit() {
    this.loadData();
    this.updateData();
  }


  loadData() {
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


  updateData() {
    this.span = document.getElementsByClassName('closeAddChangeRest')[0];
    this.modal = document.getElementById('modalAddChangeRest');
  }

  goToRestaurant(id: number) {
    this.router.navigate(['myRestaurants/' + id]);
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
          this.closeModalAddChangeRest();
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }


  changeRestaurant() {
    this.mainService.changeRestaurant(this.newRestaurant)
      .subscribe((value) => {
          console.log(value);
          this.closeModalAddChangeRest();
          // this.modal.style.display = 'none';

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

  showAddRestaurant() {
    this.operationName = 'Add restaurant';
    this.restaurantName = '';
    this.notification = 'You may add restaurants with the same names, but then their addresses must be different.';
    this.showAddRest = true;
    this.showModalAddChangeRest();

  }

  showChangeRestaurant(rest: Restaurant) {
    this.restaurantForChange.id = rest.id;
    this.restaurantForChange.name = rest.name;
    this.restaurantForChange.address = rest.address;
    this.restaurantForChange.phoneNumber = rest.phoneNumber;
    this.restaurantForChange.about = rest.about;
    this.operationName = 'Change restaurant';
    this.restaurantName = rest.name;
    this.notification = '';
    this.showChangeRest = true;
    this.showModalAddChangeRest();
  }


  showModalAddChangeRest() {
    this.modal.style.display = 'block';
  }

  closeModalAddChangeRest() {
    this.modal.style.display = 'none';
    this.showAddRest = false;
    this.showChangeRest = false;
  }


}
