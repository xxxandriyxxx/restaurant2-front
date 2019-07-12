import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/Restaurant';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.css']
})
export class MyRestaurantsComponent implements OnInit {

  modal;
  restaurants: Restaurant[] = [];
  newRestaurant: Restaurant = new Restaurant();
  restaurantForChange: Restaurant = new Restaurant();
  showAddRest: boolean;
  showChangeRest: boolean;
  operationName = '';
  notification = '';
  restaurantName = '';

  constructor(private mainService: MainService,
              private dataService: DataService,
              private router: Router,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.loadData();
    this.modal = document.getElementById('modal');
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


  goToRestaurant(id: number) {
    this.router.navigate(['myRestaurants/' + id]);
  }


  addRestaurant() {
    // this.closeModal();
    const ownerId = localStorage.getItem('_userId');
    this.mainService.addRestaurant(ownerId, this.newRestaurant)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
          this.loadData();
        },
        error => {
          console.log(error);
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }


  changeRestaurant() {
    // this.closeModal();
    this.mainService.changeRestaurant(this.restaurantForChange)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }


  deleteRestaurant(id: number) {
    this.mainService.deleteRestaurant(id)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
        });
  }


  showAddRestaurant() {
    this.operationName = 'Add restaurant';
    this.restaurantName = '';
    this.notification = 'You may add restaurants with the same names, but then their addresses must be different.';
    this.showAddRest = true;
    this.showModal();
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
    this.showModal();
  }


  showModal() {
    this.modal.style.display = 'block';
  }


  closeModal() {
    this.modal.style.display = 'none';
    this.showAddRest = false;
    this.showChangeRest = false;
  }


}
