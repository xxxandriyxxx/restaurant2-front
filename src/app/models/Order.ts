import {Restaurant} from './Restaurant';
import {Client} from './Client';
import {Dish} from './Dish';

export class Order {

  constructor(
    public id: number = null,
    public date: Date = new Date(),
    public orderStatus: OrderStatus = null,
    public client: Client = null,
    public restaurant: Restaurant = null,
    public dishes: Dish [] = []
  ) {

  }

}
