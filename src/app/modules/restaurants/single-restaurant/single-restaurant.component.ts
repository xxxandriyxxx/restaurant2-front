import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuSection} from '../../../models/MenuSection';
import {Dish} from '../../../models/Dish';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {Order} from '../../../models/Order';
import {OrderStatus} from '../../../models/OrderStatus';

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
  showSigInMessage = false;
  restaurantId = '';
  showAddSection = false;
  showChangeSect: boolean [] = [];
  showAddDish: boolean [] = [];
  menuSections: MenuSection[] = [];
  ordDishes: Dish[] = [];
  sectionsForChange: MenuSection [] = [];
  newMenuSection: MenuSection = new MenuSection();
  newSectName = '';
  newDish: Dish = new Dish();
  showChangeDish: boolean [] = [];
  newOrder: Order = new Order();


  constructor(private mainService: MainService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('_userId') !== null) {
      this.showBuy = true;
    }

    this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params.id;
      // console.log(this.restaurantId);
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


  addDishToOrder(id: number) {
    const item = this.ordDishes.find(i => i.id === id);
    const index = this.newOrder.dishes.findIndex(x => x.id === id);

    if (index === -1) {
      this.newOrder.dishes.push(item);
      this.newOrder.amount.push(1);
    } else {
      this.newOrder.amount[index] += 1;
    }
    // console.log(this.newOrder);

    this.totalAmount += 1;
    this.totalCost += item.price;
  }


  increaseAmount(index: number) {
    this.totalAmount += 1;
    this.totalCost += this.newOrder.dishes[index].price;
    this.newOrder.amount[index] += 1;
    // this.ngOnInit();
  }


  reduceAmount(index: number) {
    if (this.newOrder.amount[index] === 1) {
      this.deleteDish(index);
    } else {
      this.totalAmount -= 1;
      this.totalCost -= this.newOrder.dishes[index].price;
      this.newOrder.amount[index] -= 1;
    }
    // this.ngOnInit();
  }


  deleteDish(index: number) {
    console.log(this.newOrder);
    this.totalCost -= this.newOrder.dishes[index].price * this.newOrder.amount[index];
    this.totalAmount -= this.newOrder.amount[index];
    this.newOrder.dishes.splice(index, 1);
    this.newOrder.amount.splice(index, 1);
    // console.log(this.newOrder);
    console.log(this.ordDishes);
    // this.ngOnInit();
  }

  // addDishToOrder(id: number) {
  //   const item = this.ordDishes.find(i => i.id === id);
  //   const index = this.newOrder.dishes.findIndex(x => x.id === id);
  //
  //   if (index === -1) {
  //     this.newOrder.dishes.push(item);
  //   } else {
  //     this.newOrder.dishes[index].amount += 1;
  //   }
  //   // console.log(this.newOrder);
  //
  //   this.totalAmount += 1;
  //   this.totalCost += item.price;
  // }
  //
  //
  // // addDishToOrder(id: number) {
  // //   console.log(id);
  // //   // const item = this.ordDishes.find(i => i.id === id);
  // //   const index = this.newOrder.dishes.findIndex(x => x.id === id);
  // //   let dish;
  // //
  // //   if (index === -1) {
  // //     for (const sec of this.menuSections) {
  // //       dish = sec.dishes.find(i => i.id === id);
  // //       if (dish !== undefined) {
  // //         break;
  // //       }
  // //       console.log(dish);
  // //       this.totalCost = this.totalCost + dish.price;
  // //     }
  // //     dish.amount = 1;
  // //     this.newOrder.dishes.push(dish);
  // //   } else {
  // //     this.newOrder.dishes[index].amount += 1;
  // //     this.totalCost = this.totalCost + this.newOrder.dishes[index].price;
  // //   }
  // //   this.totalAmount = this.totalAmount + 1;
  // // }
  //
  //
  // increaseAmount(index: number) {
  //   this.totalAmount += 1;
  //   this.totalCost += this.newOrder.dishes[index].price;
  //   this.newOrder.dishes[index].amount += 1;
  //   // this.ngOnInit();
  // }
  //
  //
  // reduceAmount(index: number) {
  //   if (this.newOrder.dishes[index].amount === 1) {
  //     this.deleteDish(index);
  //   } else {
  //     this.totalAmount -= 1;
  //     this.totalCost -= this.newOrder.dishes[index].price;
  //     this.newOrder.dishes[index].amount -= 1;
  //   }
  //   // this.ngOnInit();
  // }
  //
  //
  // deleteDish(index: number) {
  //   console.log(this.newOrder);
  //   this.totalCost -= this.newOrder.dishes[index].price * this.newOrder.dishes[index].amount;
  //   this.totalAmount -= this.newOrder.dishes[index].amount;
  //   this.newOrder.dishes.splice(index, 1);
  //   // console.log(this.newOrder);
  //   console.log(this.ordDishes);
  //   // this.ngOnInit();
  // }

  cancel() {
    this.showMakeOrder = false;
    console.log(this.newOrder);
    this.ngOnInit();
  }

  makeOrder() {
    this.newOrder.date = new Date();
    this.newOrder.status = OrderStatus.ORDERED;
    this.mainService.makeOrder(this.newOrder, localStorage.getItem('_userId'), this.restaurantId)
      .subscribe((val) => {
          console.log(val);
          this.newOrder = new Order();
          this.totalAmount = 0;
          this.totalCost = 0;
          this.cancel();
        },
        error => {
          console.log(error);
        });

  }
}
