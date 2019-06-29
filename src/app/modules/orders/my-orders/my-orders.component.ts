import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {Dish} from '../../../models/Dish';
import {Order} from '../../../models/Order';
import {MainService} from '../../../services/main.service';
import {ActivatedRoute} from '@angular/router';
import {OrderStatus} from '../../../models/OrderStatus';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

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
  showCancelOrd: boolean [] = [];


  constructor(private mainService: MainService,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.mainService.getMyOrders(localStorage.getItem('_userId'))
      .subscribe((val) => {
          val.reverse();
          this.myOrders = val;
          this.ordersForShow = val;
          this.showCancelOrd = [];

          console.log(this.myOrders);
          for (const ord of this.myOrders) {
            let ordCost = 0;
            for (const dish of ord.dishes) {
              ordCost += dish.price * ord.amount[ord.dishes.indexOf(dish)];
            }
            this.totalCost.push(ordCost);
            if (ord.status === OrderStatus.ORDERED) {
              this.showCancelOrd.push(true);
            } else {
              this.showCancelOrd.push(false);
            }
          }
        },
        error => {
          console.log(error);
        });

  }

  cancelOrder(ord: Order) {
    ord.status = OrderStatus.CANCELED_BY_CLIENT;
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

  showOrdered() {
    this.ordersForShow = [];
    this.showCancelOrd = [];
    for (const ord of this.myOrders) {
      if (ord.status === OrderStatus.ORDERED) {
        this.ordersForShow.push(ord);
        this.showCancelOrd.push(true);
      }
    }
  }

  showConfirmed() {
    this.ordersForShow = [];
    this.showCancelOrd = [];
    for (const ord of this.myOrders) {
      if (ord.status === OrderStatus.CONFIRMED_BY_RESTAURANT) {
        this.ordersForShow.push(ord);
        this.showCancelOrd.push(true);
      }
    }
  }

  showCanceledByClient() {
    this.ordersForShow = [];
    this.showCancelOrd = [];
    for (const ord of this.myOrders) {
      if (ord.status === OrderStatus.CANCELED_BY_CLIENT) {
        this.ordersForShow.push(ord);
        this.showCancelOrd.push(false);
      }
    }
  }

  showCanceledByRest() {
    this.ordersForShow = [];
    this.showCancelOrd = [];
    for (const ord of this.myOrders) {
      if (ord.status === OrderStatus.CANCELED_BY_RESTAURANT) {
        this.ordersForShow.push(ord);
        this.showCancelOrd.push(false);
      }
    }
  }

  showPaid() {
    this.ordersForShow = [];
    this.showCancelOrd = [];
    for (const ord of this.myOrders) {
      if (ord.status === OrderStatus.PAID) {
        this.ordersForShow.push(ord);
        this.showCancelOrd.push(false);
      }
    }
  }

}
