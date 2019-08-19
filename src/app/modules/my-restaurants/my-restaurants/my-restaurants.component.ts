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
    this.mainService.getUserById(ownerId)
      .subscribe((user) => {
          this.ownerName = user.username;
        },
        error => {
          console.log(error);
        });
    this.mainService.getRestaurants(ownerId)
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
    this.mainService.addRestaurant(ownerId, this.formData)
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
    // this.closeModal();
    this.mainService.changeRestaurantData(this.restaurantForChange)
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
    this.mainService.changeLogo(this.restaurantForChange.id, this.formData)
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
    this.mainService.deleteRestaurant(this.restaurantForDelete.id)
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
    this.restaurantForChange.id = rest.id;
    this.restaurantForChange.name = rest.name;
    this.restaurantForChange.address = rest.address;
    this.restaurantForChange.phoneNumber = rest.phoneNumber;
    this.restaurantForChange.site = rest.site;
    this.restaurantForChange.about = rest.about;
    this.restaurantForChange.logo = rest.logo;
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
    console.log(files[0]);
    this.logo = files[0];
  }

}
