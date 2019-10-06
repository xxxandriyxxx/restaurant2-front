import {MenuSectionStatistics} from './MenuSectionStatistics';
import {Restaurant} from '../Restaurant';

export class RestaurantStatistics {

  constructor(
    public id: number = null,
    public amountByMonths: number[] = new Array(12),
    public costByMonths: number[] = new Array(12),
    public restaurant: Restaurant = null,
    public menuSectionStatistics: MenuSectionStatistics[] = []
  ) {
  }

}
