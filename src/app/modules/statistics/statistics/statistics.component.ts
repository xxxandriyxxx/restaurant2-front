import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {OrderService} from '../../../services/order.service';
import {RestaurantService} from '../../../services/restaurant.service';
import {StatisticsService} from '../../../services/statistics.service';
import {RestaurantStatistics} from '../../../models/statistics/RestaurantStatistics';
import {MenuSectionStatistics} from '../../../models/statistics/MenuSectionStatistics';
import {DishStatistics} from '../../../models/statistics/DishStatistics';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {

  amountChart: [];
  costChart = [];
  allRestaurantsStatistics: RestaurantStatistics [] = [];
  totalAmountByMonths: number [] = new Array(12);
  totalCostByMonths: number [] = new Array(12);
  restaurantName = '';
  sectionName = '';
  dishName = '';

  constructor(private restaurantService: RestaurantService,
              private orderService: OrderService,
              private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const ownerId = localStorage.getItem('_userId');
    this.statisticsService.getStatistics(ownerId)
      .subscribe((statistics) => {
          for (const restStat of statistics) {
            if (restStat !== null) {
              this.allRestaurantsStatistics.push(restStat);
            }
          }
          this.setTotalStatistics();
        },
        error => {
          console.log(error);
        });
  }


  initChart() {
    this.amountChart = new Chart('amountChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Number of orders sold in months',
          data: this.totalAmountByMonths,
          fill: false,
          lineTension: 0.2,
          borderColor: 'blue',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Total number of orders',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.costChart = new Chart('costChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Total cost of orders sold in months',
          data: this.totalCostByMonths,
          fill: false,
          lineTension: 0.2,
          borderColor: 'red',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Total cost',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  showRestaurant(restaurantStatistics: RestaurantStatistics) {
    this.restaurantName = restaurantStatistics.restaurant.name;
    this.sectionName = 'all';
    this.dishName = 'all';
    this.changeStatistics(restaurantStatistics.amountByMonths, restaurantStatistics.costByMonths);
  }

  showMenuSection(menuSectionStatistics: MenuSectionStatistics) {
    for (const restStat of this.allRestaurantsStatistics) {
      if (restStat.menuSectionStatistics.includes(menuSectionStatistics)) {
        this.restaurantName = restStat.restaurant.name;
        break;
      }
    }
    this.sectionName = menuSectionStatistics.menuSection.name;
    this.dishName = 'all';
    this.changeStatistics(menuSectionStatistics.amountByMonths, menuSectionStatistics.costByMonths);
  }

  showDish(dishStatistics: DishStatistics) {
    for (const restStat of this.allRestaurantsStatistics) {
      for (const sectionStat of restStat.menuSectionStatistics) {
        if (sectionStat.dishStatistics.includes(dishStatistics)) {
          this.restaurantName = restStat.restaurant.name;
          this.sectionName = sectionStat.menuSection.name;
          this.dishName = dishStatistics.dish.name;
          this.changeStatistics(dishStatistics.amountByMonths, dishStatistics.costByMonths);
          return;
        }
      }
    }
  }

  setTotalStatistics() {
    this.dropStatistics();
    for (const restStat of this.allRestaurantsStatistics) {
      for (let i = 0; i < 12; i++) {
        this.totalAmountByMonths[i] += restStat.amountByMonths[i];
        this.totalCostByMonths[i] += restStat.costByMonths[i];
      }
    }
    this.restaurantName = 'all';
    this.sectionName = 'all';
    this.dishName = 'all';
    this.initChart();
  }

  changeStatistics(amount: number[], cost: number[]) {
    for (let i = 0; i < 12; i++) {
      this.totalAmountByMonths[i] = amount[i];
      this.totalCostByMonths[i] = cost[i];
    }
    this.initChart();
  }

  dropStatistics() {
    for (let i = 0; i < 12; i++) {
      this.totalAmountByMonths[i] = 0;
      this.totalCostByMonths[i] = 0;
    }
  }
}

