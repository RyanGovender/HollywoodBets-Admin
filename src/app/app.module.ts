import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SportTreeComponent } from './Component/sport-tree/sport-tree.component';
import { CountryComponent } from './Component/country/country.component';
import { MarketComponent } from './Component/market/market.component';
import { TournamentComponent } from './Component/tournament/tournament.component';
import { BettypeComponent } from './Component/bettype/bettype.component';
import { EventComponent } from './Component/event/event.component';
import { SportcountryComponent } from './Component/sportcountry/sportcountry.component';
import { SporttournamentComponent } from './Component/sporttournament/sporttournament.component';
import { TournamentBettypeComponent } from './Component/tournament-bettype/tournament-bettype.component';
import { MarketBetTypeComponent } from './Component/market-bet-type/market-bet-type.component';
import { OddsComponent } from './Component/odds/odds.component';

@NgModule({
  declarations: [
    AppComponent,
    SportTreeComponent,
    CountryComponent,
    MarketComponent,
    TournamentComponent,
    BettypeComponent,
    EventComponent,
    SportcountryComponent,
    SporttournamentComponent,
    TournamentBettypeComponent,
    MarketBetTypeComponent,
    OddsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
