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
/////////////////////////////////////////////////////
//   path;
  pathLogo = '';
  selectedFile: File;
  localUrl: any[];

  logos: string [] = [];
  imageSrc: string;


  public imagePath;


  imgURL: any;
  public message: string;
  private logo: File;
  private formData = new FormData();
  private errorLoadLogo: boolean;

  // String pathToFolder = "user.home" + Path.sep + "Restaurant_Project"
  //   + File.separator + "Logo" + File.separator;


  constructor(private mainService: MainService,
              private dataService: DataService,
              private router: Router,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.loadData();
    this.modal = document.getElementById('modal');
    // this.path = document.getElementById('path');
    // var userHome = require('user-home');
    console.log(this.logo);
    console.log(this.formData);

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


  goToRestaurant(id: number, restName: string) {
    this.router.navigate(['myRestaurants/' + id], {queryParams: {name: restName}});
  }


  // addRestaurant() {
  //   // this.closeModal();
  //   const ownerId = localStorage.getItem('_userId');
  //   this.mainService.addRestaurant(ownerId, this.newRestaurant)
  //     .subscribe((value) => {
  //         this.appComponent.showModal(value.message);
  //         this.closeModal();
  //         this.loadData();
  //       },
  //       error => {
  //         console.log(error);
  //         this.appComponent.showModal(error);
  //         this.closeModal();
  //       });
  // }


  addRestaurant() {
    const ownerId = localStorage.getItem('_userId');
    this.formData.append('restaurant', JSON.stringify(this.newRestaurant));
    this.formData.append('logo', this.logo);
    this.mainService.addRestaurant(ownerId, this.formData)
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

  changeLogo() {
    this.formData.append('logo', this.logo);
    this.mainService.changeLogo(this.restaurantForChange.id, this.formData)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
        });
  }

  // changeRestaurant() {
  //   // this.closeModal();
  //   this.formData.append('restaurant', JSON.stringify(this.restaurantForChange));
  //   this.formData.append('logo', this.logo);
  //   this.mainService.changeRestaurant(this.formData)
  //     .subscribe((value) => {
  //         this.appComponent.showModal(value.message);
  //         this.closeModal();
  //         this.loadData();
  //       },
  //       error => {
  //         this.appComponent.showModal(error);
  //         this.closeModal();
  //       });
  // }


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
    this.restaurantForChange.logo = rest.logo;
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
    // this.imgURL = null;
    this.errorLoadLogo = false;
    this.ngOnInit();
  }


  loadLogo() {
    console.log(this.pathLogo);
  }

  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile.name);
  //   // console.log(this.path.toString());
  //   console.log(window.URL.createObjectURL(event.target.files[0]).toString());
  // }
  //
  // showPreviewImage(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.localUrl = event.target.result;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }
  //
  // readURL(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //
  //     const reader = new FileReader();
  //     reader.onload = e => this.imageSrc = reader.result.toString();
  //
  //     reader.readAsDataURL(file);
  //
  //     console.log(this.imageSrc);
  //     console.log(file);
  //
  //   }
  // }


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
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };


    // console.log(this.imgURL);
    // console.log(this.imagePath);
    console.log(files[0]);
    this.logo = files[0];

    // const formData: FormData = new FormData();


    // this.mainService.saveLogo(id, this.logo)
    //   .subscribe((value) => {
    //       this.appComponent.showModal(value.message);
    //       this.loadData();
    //     },
    //     error => {
    //       this.appComponent.showModal(error);
    //     });
  }

}
