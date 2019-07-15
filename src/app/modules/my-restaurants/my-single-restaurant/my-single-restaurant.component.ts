import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {Dish} from '../../../models/Dish';
import {AppComponent} from '../../../app.component';

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
  newDish: Dish = new Dish();
  dishForChange: Dish = new Dish();
  showAddSect: boolean;
  showChangeSect: boolean;
  showAddDsh: boolean;
  showChangeDsh: boolean;
  restaurantName = '';
  sectionName = '';
  description = '';

  constructor(private mainService: MainService,
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
    this.mainService.getMenuSections(this.restaurantId)
      .subscribe((sections) => {
          this.menuSections = sections;
          console.log(sections);
        },
        error => {
          console.log(error);
        });


  }


  addMenuSection() {
    // this.closeModal();
    this.mainService.addMenuSection(this.restaurantId, this.newMenuSection)
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


  changeMenuSection() {
    // this.closeModal();
    this.mainService.changeMenuSection(this.sectionForChange)
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


  deleteMenuSection(id: number) {
    this.mainService.deleteMenuSection(id)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }


  addDish() {
    // this.closeModal();
    this.newDish.price = Number(this.newDish.price);
    this.mainService.addDish(this.restaurantId, this.sectionId, this.newDish)
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


  changeDish() {
    // this.closeModal();
    this.dishForChange.price = Number(this.dishForChange.price);
    this.mainService.changeDish(this.dishForChange)
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


  deleteDish(id: number) {
    this.mainService.deleteDish(id)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
          this.closeModal();
        });
  }


  showAddSection() {
    this.description = 'The name of section should be unique for the same restaurant.';
    this.showAddSect = true;
    this.showModal();
  }


  showChangeSection(section: MenuSection) {
    this.sectionForChange.id = section.id;
    this.sectionForChange.name = section.name;
    this.sectionForChange.dishes = section.dishes;
    this.description = 'The name of section should be unique for the same restaurant.';
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
    this.dishForChange.id = dish.id;
    this.dishForChange.name = dish.name;
    this.dishForChange.description = dish.description;
    this.dishForChange.price = dish.price;
    this.sectionName = sectionName;
    this.description = 'The name of dish should be unique for the same restaurant.';
    this.showChangeDsh = true;
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
  }

}
