import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dish} from '../../../models/Dish';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialodComponent} from '../dialod/dialod.component';
import {Restaurant} from '../../../models/Restaurant';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent implements OnInit {

  restaurantId = '';
  showAddSection = false;
  showChangeSect: boolean [] = [];
  showAddDish: boolean [] = [];
  menuSections: MenuSection[] = [];
  sectionsForChange: MenuSection [] = [];
  newMenuSection: MenuSection = new MenuSection();
  newSectName = '';
  dishes: Dish[] = [];
  newDish: Dish = new Dish();
  showChangeDish: boolean [] = [];


  constructor(private mainService: MainService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
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

    // this.mainService.getDishesByRestaurantId(this.restaurantId)
    //   .subscribe((dishes) => {
    //       this.dishes = dishes;
    //       console.log(dishes);
    //     },
    //     error => {
    //       console.log(error);
    //     });

  }

  addMenuSection() {
    console.log(this.newMenuSection);
    this.newDish.price = Number(this.newDish.price);
    this.mainService.addMenuSection(this.restaurantId, this.newMenuSection)
      .subscribe((value) => {
          console.log(value);
          // window.location.reload();
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }


  changeMenuSection(section: MenuSection) {
    section.name = this.newSectName;
    console.log(section);
    this.mainService.changeMenuSection(section)
      .subscribe((value) => {
          console.log(value);
          this.newSectName = '';
          this.showChangeSect[section.id] = false;
          this.ngOnInit();
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
          this.ngOnInit();
          // window.location.reload();
        },
        error => {
          console.log(error);
        });
  }


  addDish(sectionId: number) {
    console.log(this.newDish);
    // this.mainService.getAllDishes()
    this.mainService.addDish(this.restaurantId, sectionId, this.newDish)
      .subscribe((value) => {
          console.log(value);
          this.newDish.name = '';
          this.newDish.description = '';
          this.newDish.price = null;
          this.showAddDish[sectionId] = false;
          this.ngOnInit();
          // window.location.reload();
        },
        error => {
          console.log(error);
        });
  }


  changeDish(dish: Dish) {
    this.newDish.id = dish.id;
    this.mainService.changeDish(this.newDish)
      .subscribe((value) => {
          console.log(value);
          this.showChangeDish[dish.id] = false;
          this.newDish.name = '';
          this.newDish.description = '';
          this.newDish.price = null;
          this.newDish.id = null;
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }

  deleteDish(id: number) {
    this.mainService.deleteDish(id)
      .subscribe((value) => {
          console.log(value);
          this.ngOnInit();
          // window.location.reload();
        },
        error => {
          console.log(error);
        });
  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular for beginners'
    };
    // this.dialog.open(DialodComponent, dialogConfig)
    const dialogRef = this.dialog.open(DialodComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: Dish) => {
        this.newDish = data;
        console.log(this.newDish);
      });
  }

}
