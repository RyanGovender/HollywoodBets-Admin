import { Interface } from "readline";
import { MarketService } from '../Service/market.service';

export interface Market{
   marketId:number;
   marketName:string;
}

export interface MarketBetType{
   marketId:number;
   betTypeId:number;
}

export interface MarketBetViewModel{
   marketBetTypeId:number;
   betTypeName:string;
   marketName:string;
}