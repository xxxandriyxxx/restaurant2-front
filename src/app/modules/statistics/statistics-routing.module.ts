import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './statistics/statistics.component';



const routes: Routes = [
  {path: '', component: StatisticsComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
