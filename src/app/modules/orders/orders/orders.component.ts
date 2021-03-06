import {Component, OnInit} from '@angular/core';
import {Order} from '../../../models/Order';
import {MainService} from '../../../services/main.service';
import {ActivatedRoute} from '@angular/router';
import {OrderStatus} from '../../../models/OrderStatus';
import {Restaurant} from '../../../models/Restaurant';
import {AppComponent} from '../../../app.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  whoseOrders = '';
  myOrders: Order [] = [];
  ordersForShow: Order [] = [];
  restForShowId: number = null;
  restForShowName = '';
  statusForShow = '';
  totalCost: number [] = [];
  showCancelOrd: boolean [] = [];
  showConfirmOrd: boolean [] = [];
  showPaidOrd: boolean [] = [];
  restaurants: Restaurant [] = [];
  whoseOrdersHeader = '';

  constructor(private mainService: MainService,
              private activatedRoute: ActivatedRoute,
              private appComponent: AppComponent) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.whoseOrders = params.whose;
      this.loadData();
    });
  }


  loadData() {
    this.myOrders = [];

    switch (this.whoseOrders) {
      case 'my': {
        this.mainService.getMyOrders(localStorage.getItem('_userId'))
          .subscribe((val) => {
              val.reverse();
              this.myOrders = val;
              this.updateData();
            },
            error => {
              console.log(error);
            });
        break;
      }
      case 'clients': {
        this.mainService.getOrdersByOwnerId(localStorage.getItem('_userId'))
          .subscribe((val) => {
              val.reverse();
              this.myOrders = val;
              this.updateData();
            },
            error => {
              console.log(error);
            });
        break;
      }
      default: {
        console.log('ERROR: whoseOrders = ' + this.whoseOrders);
        break;
      }
    }
  }

  updateData() {
    this.resetShow();
    this.restForShowId = null;
    this.restaurants = [];
    this.totalCost = [];
    this.ordersForShow = this.myOrders;
    this.restForShowName = 'all';
    this.statusForShow = 'all';
    console.log(this.myOrders);

    if (this.whoseOrders === 'my') {
      this.whoseOrdersHeader = 'My orders';
    } else if (this.whoseOrders === 'clients') {
      this.whoseOrdersHeader = 'Clients\' orders';
    } else {
      this.whoseOrdersHeader = 'ERROR: whoseOrders = ' + this.whoseOrders;
    }


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
  }


  cancelOrder(ord: Order) {
    if (this.whoseOrders === 'my') {
      ord.status = OrderStatus.CANCELED_BY_CLIENT;
    } else {
      ord.status = OrderStatus.CANCELED_BY_RESTAURANT;
    }
    this.mainService.changeOrderStatus(ord)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
        });
  }

  confirmOrder(ord: Order) {
    ord.status = OrderStatus.CONFIRMED_BY_RESTAURANT;
    this.mainService.changeOrderStatus(ord)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
        });
  }

  paidOrder(ord: Order) {
    ord.status = OrderStatus.PAID;
    this.mainService.changeOrderStatus(ord)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
        });
  }

  showAll() {
    // this.router.navigate(['orders/' + this.whoseOrders]);
    this.loadData();
  }


  showByRestaurant(id: number) {
    if (id === null) {
      this.loadData();
    } else {
      const rest = this.restaurants.find(i => i.id === id);
      this.restForShowId = rest.id;
      this.restForShowName = rest.name;
      this.statusForShow = 'all';
      this.resetShow();
      for (const ord of this.myOrders) {
        if (ord.restaurant.id === rest.id) {
          this.ordersForShow.push(ord);
        }
      }
      this.assignShow(this.ordersForShow);
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
