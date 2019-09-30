import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../../models/Restaurant';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {UserService} from '../../../services/user.service';
import {RestaurantService} from '../../../services/restaurant.service';

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
  restaurantForDelete: Restaurant = new Restaurant();
  showAddRest: boolean;
  showChangeRest: boolean;
  showDeleteRest: boolean;
  operationName = '';
  notification = '';
  restaurantName = '';
  imgURL: any;
  private logo: File = null;
  private formData = new FormData();
  private errorLoadLogo: boolean;
  ownerName = '';

  constructor(private userService: UserService,
              private restaurantService: RestaurantService,
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
    this.userService.getUserById(ownerId)
      .subscribe((user) => {
          this.ownerName = user.username;
        },
        error => {
          console.log(error);
        });
    this.restaurantService.getRestaurants(ownerId)
      .subscribe((restaurants) => {
          this.restaurants = restaurants;
          console.log(restaurants);
        },
        error => {
          console.log(error);
        });
    this.formData.delete('restaurant');
    this.formData.delete('logo');

  }

  goToRestaurant(id: number, restName: string) {
    this.router.navigate(['myRestaurants/' + id], {queryParams: {name: restName}});
  }

  addRestaurant() {
    console.log(this.newRestaurant);
    const ownerId = localStorage.getItem('_userId');
    this.formData.append('restaurant', JSON.stringify(this.newRestaurant));
    this.formData.append('logo', this.logo);
    this.restaurantService.addRestaurant(ownerId, this.formData)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  changeRestaurantData() {
    this.restaurantService.changeRestaurantData(this.restaurantForChange)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  changeLogo() {
    this.formData.append('logo', this.logo);
    this.restaurantService.changeLogo(this.restaurantForChange.id, this.formData)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  deleteRestaurant() {
    this.restaurantService.deleteRestaurant(this.restaurantForDelete.id)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  showAddRestaurant() {
    this.operationName = 'Add a restaurant';
    this.restaurantName = '';
    this.notification = 'You may add restaurants with the same names, but then their addresses must be different.';
    this.showAddRest = true;
    this.showModal();
  }

  showChangeRestaurant(rest: Restaurant) {
    this.restaurantForChange = rest;
    this.operationName = 'Change the restaurant';
    this.restaurantName = rest.name;
    this.notification = '';
    this.showChangeRest = true;
    this.showModal();
  }

  showDeleteRestaurant(rest: Restaurant) {
    this.restaurantForDelete = rest;
    this.showDeleteRest = true;
    this.showModal();
  }

  showModal() {
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.showAddRest = false;
    this.showChangeRest = false;
    this.showDeleteRest = false;
    this.errorLoadLogo = false;
    this.loadData();
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    this.errorLoadLogo = false;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.errorLoadLogo = true;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
    this.logo = files[0];
  }

}
