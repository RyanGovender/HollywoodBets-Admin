import { Component, OnInit, Input } from '@angular/core';
import { Market, MarketBetType } from 'src/app/Models/Market';
import { BetType } from 'src/app/Models/BetType';
import { BettypeService } from 'src/app/Service/bettype.service';
import { MarketService } from 'src/app/Service/market.service';

@Component({
  selector: 'app-market-bet-type',
  templateUrl: './market-bet-type.component.html',
  styleUrls: ['./market-bet-type.component.css']
})
export class MarketBetTypeComponent implements OnInit {

  @Input() marketInput:any;

  constructor(private betTypeService:BettypeService,private marketService:MarketService) { }

  betType:any;
  market:any;
  betTypeMarkets:any;

  betTypeItem:BetType;
  marketItem:Market;

  selectedBetType:BetType;
  selectedMarket:Market;

  messageAlert = false;
  message = '';

  createdObjected:MarketBetType;

  ngOnInit(): void {
    this.GetAllBetTypes();
    this.GetAllMarkets();
    this.GetAllMarektBetTypes();
  }

  GetAllBetTypes()
  {
    return this.betTypeService.GetAllTournament().subscribe(
      (value:any)=>{
        this.betType = value;
        this.betTypeItem = value[0].betTypeName;
        this.selectedBetType = value[0];
      }
    );
  }

  GetAllMarkets()
  {
    return this.marketService.GetAllMarkets().subscribe(
      (value:any)=>{
         this.market = value;
        this.marketItem = value[0].marketName;
        this.selectedMarket = value[0];
      }
    );
  }

  GetAllMarektBetTypes()
  {
    return this.marketService.GetAllMarketBets().subscribe(
      (value:any)=>
      {
        this.betTypeMarkets = value;
      }
    )
  }

  SelectBetType(betType)
  {
    this.selectedBetType = betType;
    this.betTypeItem = betType.betTypeName;
  }

  SelectMarket(market)
  {
    this.selectedMarket = market;
    this.marketItem = market.marketName;
  }

  PostBetTypeMarket()
  {
     this.createdObjected ={
       betTypeId:this.selectedBetType.betTypeId,
       marketId:this.selectedMarket.marketId
     };

     this.marketService.PostMarketBetType(this.createdObjected).subscribe(
       (value:any)=>{
        this.messageAlert = true;
        if(value!=undefined)
        {
           this.message = value.status;
        }
        else
        {
          this.message = 'Mapping objects has failed.';
        }
       }
     )
  }

  close()
  {
    this.messageAlert = false;
    this.message ='';
  }

}
