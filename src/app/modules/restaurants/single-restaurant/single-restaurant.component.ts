import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuSection} from '../../../models/MenuSection';
import {Dish} from '../../../models/Dish';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent implements OnInit {

  showBuy = false;
  count = 0;
  showSigInMessage = false;
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
  ) {
  }

  ngOnInit() {


    this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params.id;
      console.log(this.restaurantId);
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

}
