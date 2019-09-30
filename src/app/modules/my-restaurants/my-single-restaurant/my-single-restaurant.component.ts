import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {Dish} from '../../../models/Dish';
import {AppComponent} from '../../../app.component';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-my-single-restaurant',
  templateUrl: './my-single-restaurant.component.html',
  styleUrls: ['./my-single-restaurant.component.css']
})
export class MySingleRestaurantComponent implements OnInit {

  modal;
  restaurantId = '';
  sectionId: number = null;
  menuSections: MenuSection[] = [];
  dishes: Dish[] = [];
  newMenuSection: MenuSection = new MenuSection();
  sectionForChange: MenuSection = new MenuSection();
  sectionForDelete: MenuSection = new MenuSection();
  newDish: Dish = new Dish();
  dishForChange: Dish = new Dish();
  dishForDelete: Dish = new Dish();
  showAddSect: boolean;
  showChangeSect: boolean;
  showAddDsh: boolean;
  showChangeDsh: boolean;
  showDeleteSect: boolean;
  showDeleteDsh: boolean;
  operationName = '';
  restaurantName = '';
  sectionName = '';
  description = '';

  constructor(private restaurantService: RestaurantService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private appComponent: AppComponent) {
  }


  ngOnInit() {
    this.loadData();
    this.modal = document.getElementById('modal');
  }

  loadData() {
    this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params.id;
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.restaurantName = params.name;
    });
    this.restaurantService.getMenuSections(this.restaurantId)
      .subscribe((sections) => {
          this.menuSections = sections;
          console.log(sections);
        },
        error => {
          console.log(error);
        });
  }

  addMenuSection() {
    this.restaurantService.addMenuSection(this.restaurantId, this.newMenuSection)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  changeMenuSection() {
    this.restaurantService.changeMenuSection(this.sectionForChange)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  deleteMenuSection() {
    this.restaurantService.deleteMenuSection(this.sectionForDelete.id)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  addDish() {
    this.newDish.price = Number(this.newDish.price);
    this.restaurantService.addDish(this.restaurantId, this.sectionId, this.newDish)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  changeDish() {
    this.dishForChange.price = Number(this.dishForChange.price);
    this.restaurantService.changeDish(this.dishForChange)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  deleteDish() {
    this.restaurantService.deleteDish(this.dishForDelete.id)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.closeModal();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }

  showAddSection() {
    this.description = 'The name of menu section should be unique for the same restaurant.';
    this.showAddSect = true;
    this.showModal();
  }

  showChangeSection(section: MenuSection) {
    this.sectionForChange = section;
    this.description = 'The name of menu section should be unique for the same restaurant.';
    this.sectionName = section.name;
    this.showChangeSect = true;
    this.showModal();
  }

  showAddDish(section: MenuSection) {
    this.sectionId = section.id;
    this.sectionName = section.name;
    this.description = 'The name of dish should be unique for the same restaurant.';
    this.showAddDsh = true;
    this.showModal();
  }

  showChangeDish(dish: Dish, sectionName: string) {
    this.dishForChange = dish;
    this.sectionName = sectionName;
    this.description = 'The name of dish should be unique for the same restaurant.';
    this.showChangeDsh = true;
    this.showModal();
  }

  showDeleteSection(section: MenuSection) {
    this.sectionForDelete = section;
    this.operationName = 'Delete the menu section';
    this.showDeleteSect = true;
    this.showModal();
  }

  showDeleteDish(dish: Dish) {
    this.dishForDelete = dish;
    this.operationName = 'Delete the dish';
    this.showDeleteDsh = true;
    this.showModal();
  }

  showModal() {
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.showAddSect = false;
    this.showChangeSect = false;
    this.showAddDsh = false;
    this.showChangeDsh = false;
    this.showDeleteSect = false;
    this.showDeleteDsh = false;
    this.loadData();
  }

}
