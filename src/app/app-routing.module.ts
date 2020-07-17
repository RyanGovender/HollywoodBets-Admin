import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './Component/country/country.component';
import { SportTreeComponent } from './Component/sport-tree/sport-tree.component';
import { MarketComponent } from './Component/market/market.component';
import { TournamentComponent } from './Component/tournament/tournament.component';
import { BettypeComponent } from './Component/bettype/bettype.component';
import { EventComponent } from './Component/event/event.component';


const routes: Routes = [
  {path: 'country', component:CountryComponent},
  {path: 'sport-tree', component:SportTreeComponent},
  {path: 'market', component:MarketComponent},
  {path: 'tournament', component:TournamentComponent},
  {path: 'bettype', component:BettypeComponent},
  {path: 'event', component:EventComponent},
  {path:'', redirectTo: '/country', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
