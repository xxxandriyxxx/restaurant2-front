import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuSection} from '../../../models/MenuSection';
import {Dish} from '../../../models/Dish';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {Order} from '../../../models/Order';
import {OrderStatus} from '../../../models/OrderStatus';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent implements OnInit {

  showMakeOrder = false;
  showBuy = false;
  totalAmount = 0;
  totalCost = 0;
  restaurantId = '';
  menuSections: MenuSection[] = [];
  ordDishes: Dish[] = [];
  newOrder: Order = new Order();
  private restaurantName = '';
  showSect: boolean [] = [];


  constructor(private mainService: MainService,
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
      // console.log(this.restaurantId);
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.restaurantName = params.name;
    });

    this.mainService.getMenuSections(this.restaurantId)
      .subscribe((sections) => {
          this.menuSections = sections;
          // console.log(sections);
          this.ordDishes = [];
          for (const s of sections) {
            for (const d of s.dishes) {
              // d.amount = 1;
              this.ordDishes.push(d);
            }
          }
          console.log(this.ordDishes);
        },
        error => {
          console.log(error);
        });

  }

  updateData() {
    // const userClass = localStorage.getItem('_userClass');
    // if (userClass == null || userClass === 'AdminInMemory') {
    //   this.showBuy = false;
    // } else {
    //   this.showBuy = true;
    // }
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

    console.log(this.restaurantId);
    console.log(sessionStorage.getItem('_restaurantId'));

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


  // increaseAmount(index: number) {
  //   this.totalAmount += 1;
  //   this.totalCost += this.newOrder.dishes[index].price;
  //   this.newOrder.amount[index] += 1;
  //   // this.ngOnInit();
  // }
  //
  //
  // reduceAmount(index: number) {
  //   if (this.newOrder.amount[index] === 1) {
  //     this.deleteDish(index);
  //   } else {
  //     this.totalAmount -= 1;
  //     this.totalCost -= this.newOrder.dishes[index].price;
  //     this.newOrder.amount[index] -= 1;
  //   }
  //   // this.ngOnInit();
  // }
  //
  //
  // deleteDish(index: number) {
  //   console.log(this.newOrder);
  //   this.totalCost -= this.newOrder.dishes[index].price * this.newOrder.amount[index];
  //   this.totalAmount -= this.newOrder.amount[index];
  //   this.newOrder.dishes.splice(index, 1);
  //   this.newOrder.amount.splice(index, 1);
  //   // console.log(this.newOrder);
  //   console.log(this.ordDishes);
  //   // this.ngOnInit();
  // }


  // cancel() {
  //   this.showMakeOrder = false;
  //   console.log(this.newOrder);
  //   this.ngOnInit();
  // }
  //
  // placeOrder() {
  //   this.newOrder.date = new Date();
  //   this.newOrder.status = OrderStatus.ORDERED;
  //   this.mainService.placeOrder(this.newOrder, localStorage.getItem('_userId'), this.restaurantId)
  //     .subscribe((val) => {
  //         console.log(val);
  //         this.newOrder = new Order();
  //         this.totalAmount = 0;
  //         this.totalCost = 0;
  //         this.cancel();
  //         this.appComponent.showModal(val.message);
  //       },
  //       error => {
  //         console.log(error);
  //         this.appComponent.showModal(error);
  //       });
  // }
}
