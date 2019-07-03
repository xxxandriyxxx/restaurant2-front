import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {Dish} from '../../../models/Dish';
import {Order} from '../../../models/Order';
import {MainService} from '../../../services/main.service';
import {ActivatedRoute} from '@angular/router';
import {OrderStatus} from '../../../models/OrderStatus';
import {Restaurant} from '../../../models/Restaurant';

@Component({
  selector: 'app-restaurants-orders',
  templateUrl: './restaurants-orders.component.html',
  styleUrls: ['../my-orders/my-orders.component.css',
    './restaurants-orders.component.css']
})
export class RestaurantsOrdersComponent implements OnInit {

  showMakeOrder = false;
  showBuy = false;
  totalAmount = 0;
  totalCost: number [] = [];
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
  myOrders: Order [] = [];
  ordersForShow: Order [] = [];
  restForShowId: number = null;
  restForShowName = '';
  statusForShow = '';
  showCancelOrd: boolean [] = [];
  showConfirmOrd: boolean [] = [];
  showPaidOrd: boolean [] = [];
  restaurants: Restaurant [] = [];

  constructor(private mainService: MainService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.mainService.getOrdersByOwnerId(localStorage.getItem('_userId'))
      .subscribe((val) => {
          this.resetShow();
          this.restForShowId = null;
          this.restForShowName = 'all';
          this.statusForShow = 'all';
          console.log('restForShowId = ' + this.restForShowId);
          // this.restaurants = [];
          val.reverse();
          this.myOrders = val;
          this.ordersForShow = val;
          console.log(this.myOrders);

          for (const ord of this.myOrders) {
            let ordCost = 0;
            for (const dish of ord.dishes) {
              ordCost += dish.price * ord.amount[ord.dishes.indexOf(dish)];
            }
            this.totalCost.push(ordCost);

            const item = this.restaurants.find(i => i.id === ord.restaurant.id);
            if (!item) {
              this.restaurants.push(ord.restaurant);
            }
          }
          this.assignShow(this.myOrders);
        },
        error => {
          console.log(error);
        });

  }


  cancelOrder(ord: Order) {
    ord.status = OrderStatus.CANCELED_BY_RESTAURANT;
    this.mainService.changeOrderStatus(ord)
      .subscribe((val) => {
          console.log(val);
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }

  confirmOrder(ord: Order) {
    ord.status = OrderStatus.CONFIRMED_BY_RESTAURANT;
    this.mainService.changeOrderStatus(ord)
      .subscribe((val) => {
          console.log(val);
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }

  paidOrder(ord: Order) {
    ord.status = OrderStatus.PAID;
    this.mainService.changeOrderStatus(ord)
      .subscribe((val) => {
          console.log(val);
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }

  showAll() {
    this.ngOnInit();
  }


  // showByRestaurantId(id: number) {
  //   const item = this.restaurants.find(i => i.id === id);
  //   this.showByRestaurant(item);
  // }

  showByRestaurant(id: number) {
    if (id === null) {
      this.ngOnInit();
    } else {
      const rest = this.restaurants.find(i => i.id === id);
      this.restForShowId = rest.id;
      this.restForShowName = rest.name;
      this.statusForShow = 'all'
      this.resetShow();
      for (const ord of this.myOrders) {
        if (ord.restaurant.id === rest.id) {
          this.ordersForShow.push(ord);
        }
      }
      this.assignShow(this.ordersForShow);
      // console.log(this.ordersForShow);
    }
  }

  showOrdered() {
    this.resetShow();
    for (const ord of this.myOrders) {
      if (((this.restForShowId === null) || (ord.restaurant.id === this.restForShowId)) &&
        (ord.status === OrderStatus.ORDERED)) {
        this.ordersForShow.push(ord);
      }
    }
    this.assignShow(this.ordersForShow);
    this.statusForShow = 'ordered';
  }


  showCanceledByClient() {
    this.resetShow();
    for (const ord of this.myOrders) {
      if (((this.restForShowId === null) || (ord.restaurant.id === this.restForShowId)) &&
        (ord.status === OrderStatus.CANCELED_BY_CLIENT)) {
        this.ordersForShow.push(ord);
      }
    }
    this.assignShow(this.ordersForShow);
    this.statusForShow = 'canceled by client';
  }

  showCanceledByRest() {
    this.resetShow();
    for (const ord of this.myOrders) {
      if (((this.restForShowId === null) || (ord.restaurant.id === this.restForShowId)) &&
        (ord.status === OrderStatus.CANCELED_BY_RESTAURANT)) {
        this.ordersForShow.push(ord);
      }
    }
    this.assignShow(this.ordersForShow);
    this.statusForShow = 'canceled by restaurant';
  }


  showConfirmed() {
    this.resetShow();
    for (const ord of this.myOrders) {
      if (((this.restForShowId === null) || (ord.restaurant.id === this.restForShowId)) &&
        (ord.status === OrderStatus.CONFIRMED_BY_RESTAURANT)) {
        this.ordersForShow.push(ord);
      }
    }
    this.assignShow(this.ordersForShow);
    this.statusForShow = 'confirmed by restaurant';
  }


  showPaid() {
    this.resetShow();
    for (const ord of this.myOrders) {
      if (((this.restForShowId === null) || (ord.restaurant.id === this.restForShowId)) &&
        (ord.status === OrderStatus.PAID)) {
        this.ordersForShow.push(ord);
      }
    }
    this.assignShow(this.ordersForShow);
    this.statusForShow = 'paid';
  }


  assignShow(orders: Order []) {
    for (const ord of orders) {

      switch (ord.status) {
        case OrderStatus.ORDERED: {
          this.showCancelOrd.push(true);
          this.showConfirmOrd.push(true);
          this.showPaidOrd.push(true);
          break;
        }
        case OrderStatus.CONFIRMED_BY_RESTAURANT: {
          this.showCancelOrd.push(false);
          this.showConfirmOrd.push(false);
          this.showPaidOrd.push(true);
          break;
        }
        default: {
          this.showCancelOrd.push(false);
          this.showConfirmOrd.push(false);
          this.showPaidOrd.push(false);
          break;
        }
      }
    }

  }

  resetShow() {
    this.ordersForShow = [];
    this.showCancelOrd = [];
    this.showConfirmOrd = [];
    this.showPaidOrd = [];
  }


}
