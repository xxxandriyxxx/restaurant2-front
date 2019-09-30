import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuSection} from '../../../models/MenuSection';
import {Dish} from '../../../models/Dish';
import {DataService} from '../../../services/data.service';
import {Order} from '../../../models/Order';
import {AppComponent} from '../../../app.component';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent implements OnInit {

  totalAmount = 0;
  totalCost = 0;
  restaurantId = '';
  menuSections: MenuSection[] = [];
  ordDishes: Dish[] = [];
  newOrder: Order = new Order();
  private restaurantName = '';
  showSect: boolean [] = [];

  constructor(private restaurantService: RestaurantService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private appComponent: AppComponent
  ) {
  }

  ngOnInit() {
    this.loadData();
    this.updateData();
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
          this.ordDishes = [];
          for (const s of sections) {
            for (const d of s.dishes) {
              this.ordDishes.push(d);
            }
          }
        },
        error => {
          console.log(error);
        });

  }


  updateData() {
    for (const sect of this.menuSections) {
      this.showSect.push(false);
    }
    if (+sessionStorage.getItem('_totalAmount') !== 0) {
      if (this.restaurantId === sessionStorage.getItem('_restaurantId')) {
        this.newOrder = JSON.parse(sessionStorage.getItem('_newOrder'));
        this.totalAmount = +sessionStorage.getItem('_totalAmount');
        this.totalCost = +sessionStorage.getItem('_totalCost');
      } else {
        this.appComponent.showModal('You have an unconfirmed order at another restaurant. ' +
          'If you place an order at opened restaurant, the previous one will be canceled.');
      }
    }
  }


  addDishToOrder(id: number) {
    const item = this.ordDishes.find(i => i.id === id);
    const index = this.newOrder.dishes.findIndex(x => x.id === id);

    if (index === -1) {
      this.newOrder.dishes.push(item);
      this.newOrder.amount.push(1);
    } else {
      this.newOrder.amount[index] += 1;
    }
    this.totalAmount += 1;
    this.totalCost += item.price;

    sessionStorage.setItem('_restaurantId', this.restaurantId);
    sessionStorage.setItem('_restaurantName', this.restaurantName);
    sessionStorage.setItem('_totalAmount', this.totalAmount.toString());
    sessionStorage.setItem('_totalCost', this.totalCost.toString());
    sessionStorage.setItem('_newOrder', JSON.stringify(this.newOrder));
    this.appComponent.changeAmount();
  }


  showSection(id: number) {
    if (this.showSect[id] === true) {
      this.showSect[id] = false;
    } else {
      this.showSect[id] = true;
    }
  }

}
