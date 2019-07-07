import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dish} from '../../../models/Dish';
// import {MatDialog, MatDialogConfig} from '@angular/material';
// import {DialodComponent} from '../dialod/dialod.component';
import {Restaurant} from '../../../models/Restaurant';

@Component({
  selector: 'app-my-single-restaurant',
  templateUrl: './my-single-restaurant.component.html',
  styleUrls: ['./my-single-restaurant.component.css']
})
export class MySingleRestaurantComponent implements OnInit {

  span;
  modal;

  restaurantId = '';
  // showAddSection = false;
  // showChangeSect: boolean [] = [];
  // showAddDish: boolean [] = [];
  menuSections: MenuSection[] = [];
  // sectionsForChange: MenuSection [] = [];
  dishes: Dish[] = [];
  // showChangeDish: boolean [] = [];


  newMenuSection: MenuSection = new MenuSection();
  sectionForChange: MenuSection = new MenuSection();
  // sectionName = '';
  newDish: Dish = new Dish();
  dishForChange: Dish = new Dish();
  dishName = '';
  showAddSect: boolean;
  showChangeSect: boolean;
  showAddDsh: boolean;
  showChangeDsh: boolean;
  description = '';
  sectionId: number = null;
  sectionName = '';


  constructor(private mainService: MainService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit() {
    this.loadData();
    this.updateData();
  }


  loadData() {
    this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params.id;
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


  updateData() {
    this.span = document.getElementsByClassName('closeModal')[0];
    this.modal = document.getElementById('modal');
  }


  addMenuSection() {
    console.log(this.newMenuSection);
    this.mainService.addMenuSection(this.restaurantId, this.newMenuSection)
      .subscribe((value) => {
          console.log(value);
          this.closeModal();
          // window.location.reload();
          this.loadData();
        },
        error => {
          console.log(error);
        });
  }


  changeMenuSection() {
    console.log(this.sectionForChange);
    this.mainService.changeMenuSection(this.sectionForChange)
      .subscribe((value) => {
          console.log(value);
          this.closeModal();
          this.loadData();

          // window.location.reload();
        },
        error => {
          console.log(error);
        });
  }


  deleteMenuSection(id: number) {
    this.mainService.deleteMenuSection(id)
      .subscribe((value) => {
          console.log(value);
          this.loadData();

          // window.location.reload();
        },
        error => {
          console.log(error);
        });
  }


  addDish() {
    console.log(this.newDish);
    this.newDish.price = Number(this.newDish.price);
    this.mainService.addDish(this.restaurantId, this.sectionId, this.newDish)
      .subscribe((value) => {
          console.log(value);
          this.closeModal();
          this.loadData();

          // window.location.reload();
        },
        error => {
          console.log(error);
        });
  }


  changeDish() {
    console.log(this.dishForChange);
    this.dishForChange.price = Number(this.dishForChange.price);
    this.mainService.changeDish(this.dishForChange)
      .subscribe((value) => {
          console.log(value);
          // this.showChangeDish[dish.id] = false;
          // this.newDish.name = '';
          // this.newDish.description = '';
          // this.newDish.price = null;
          // this.newDish.id = null;
          this.closeModal();
          this.loadData();

        },
        error => {
          console.log(error);
        });
  }

  deleteDish(id: number) {
    this.mainService.deleteDish(id)
      .subscribe((value) => {
          console.log(value);
          this.loadData();

          // window.location.reload();
        },
        error => {
          console.log(error);
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
