export interface Odds{
    oddsId:number;
    marketBetTypeId:number;
    eventId:number;
    oddsValue:number;
}

export interface OddsViewModel{
    oddsId:number;
    marketBetTypeId:number;
    eventName:string;
    betTypeName:string;
    marketName:string;
    odds:number;
}