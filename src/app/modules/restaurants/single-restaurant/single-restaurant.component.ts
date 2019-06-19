import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dish} from '../../../models/Dish';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialodComponent} from '../dialod/dialod.component';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent implements OnInit {

  restaurantId = '';
  showAddSection = false;
  showAddDish: boolean [] = [];
  newMenuSection: MenuSection = new MenuSection();
  sections: MenuSection[] = [];
  newDish: Dish;


  constructor(private mainService: MainService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params.id;

      this.mainService.getMenuSections(this.restaurantId)
        .subscribe((sections) => {
            this.sections = sections;
            console.log(sections);
          },
          error => {
            console.log(error);
          });
    });
  }

  addMenuSection() {
    this.mainService.addMenuSection(this.restaurantId, this.newMenuSection)
      .subscribe((value) => {
          console.log(value);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }


  addDish(sectionId: string) {
    this.mainService.addDish(this.restaurantId, sectionId, this.newDish)
      .subscribe((value) => {
          console.log(value);
          window.location.reload();
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

    // this.dialog.open(DialodComponent, dialogConfig);

    const dialogRef = this.dialog.open(DialodComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog output', data)
    );
  }

}
