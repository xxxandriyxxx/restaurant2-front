import {Component, OnInit} from '@angular/core';
import {MenuSection} from '../../../models/MenuSection';
import {Dish} from '../../../models/Dish';
import {Order} from '../../../models/Order';
import {AppComponent} from '../../../app.component';
import {OrderStatus} from '../../../models/OrderStatus';
import {MainService} from '../../../services/main.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  totalAmount = 0;
  totalCost = 0;
  newOrder: Order = new Order();
  private restaurantName = '';
  logged: boolean;


  constructor(private mainService: MainService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('_newOrder')) {
      this.restaurantName = sessionStorage.getItem('_restaurantName');
      this.totalAmount = +sessionStorage.getItem('_totalAmount');
      this.totalCost = +sessionStorage.getItem('_totalCost');
      this.newOrder = JSON.parse(sessionStorage.getItem('_newOrder'));
    }
    const userClass = localStorage.getItem('_userClass');
    if (userClass && userClass !== 'AdminInMemory') {
      this.logged = true;
    } else {
      this.logged = false;
    }

  }


  increaseAmount(index: number) {
    this.totalAmount += 1;
    this.totalCost += this.newOrder.dishes[index].price;
    this.newOrder.amount[index] += 1;
    this.changeSessionStorage(this.newOrder, this.totalAmount, this.totalCost);
    this.changeBasket();
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
    this.changeSessionStorage(this.newOrder, this.totalAmount, this.totalCost);
    this.changeBasket();
    if (this.totalAmount === 0) {
      this.clearSessionStorage();
      this.restaurantName = '';
    }
    // this.ngOnInit();
  }


  deleteDish(index: number) {
    console.log(this.newOrder);
    this.totalCost -= this.newOrder.dishes[index].price * this.newOrder.amount[index];
    this.totalAmount -= this.newOrder.amount[index];
    this.newOrder.dishes.splice(index, 1);
    this.newOrder.amount.splice(index, 1);
    this.changeSessionStorage(this.newOrder, this.totalAmount, this.totalCost);
    this.changeBasket();
    if (this.totalAmount === 0) {
      this.clearSessionStorage();
      this.restaurantName = '';
    }
    // this.ngOnInit();
  }


  placeOrder() {
    this.newOrder.date = new Date();
    this.newOrder.status = OrderStatus.ORDERED;
    this.mainService.placeOrder(this.newOrder, localStorage.getItem('_userId'), sessionStorage.getItem('_restaurantId'))
      .subscribe((val) => {
          console.log(val);
          this.newOrder = new Order();
          this.totalAmount = 0;
          this.totalCost = 0;
          this.appComponent.showModal(val.message);
          this.clearSessionStorage();
          this.restaurantName = '';
          this.appComponent.changeAmount();
        },
        error => {
          console.log(error);
          this.appComponent.showModal(error);
        });

  }

  changeSessionStorage(newOrder: Order, totalAmount: number, totalCost: number) {
    sessionStorage.setItem('_totalAmount', totalAmount.toString());
    sessionStorage.setItem('_totalCost', totalCost.toString());
    sessionStorage.setItem('_newOrder', JSON.stringify(newOrder));
  }

  clearSessionStorage() {
    sessionStorage.removeItem('_restaurantId');
    sessionStorage.removeItem('_restaurantName');
    sessionStorage.removeItem('_totalAmount');
    sessionStorage.removeItem('_totalCost');
    sessionStorage.removeItem('_newOrder');
  }

  changeBasket() {
    this.appComponent.changeAmount();
  }


}
