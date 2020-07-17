import { Component, OnInit } from '@angular/core';
import { Market } from 'src/app/Models/Market';
import { MarketService } from 'src/app/Service/market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  countries:any;
  country:Market;
  showConfirmAlert= false;
  showfailedAlert = false;
  alert = false;
  warningAlert = false;
  messageAlert ='';
  message = '';
  selectMarket: Market ={
    marketId:0,
    marketName:''
  };

  constructor(private _countryService:MarketService) { }

  ngOnInit(): void {
    this.GetAllMarkets();
  }

  GetAllMarkets()
  {
    return this._countryService.GetAllMarkets().subscribe((data)=>{
      this.countries = data;
    });
  }
  validationCheck(name:string)
  {
     if(name==="")
     {
       return false
     }
     return true;
  }

  AddToMarket(name)
  {
    this.close();
    this.country = {
      marketId:0,
      marketName:name
    };

    if(this.validationCheck(name))
    {
      this._countryService.PostMarkets(this.country).subscribe(
        (value:any)=>{
  
        if(value.status.startsWith('S'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
        this.GetAllMarkets();
        }
      );
      this.message ='';
    }
    else{
       this.message = "All Fields must be filled.";
    }
    
  }

  DeleteMarket(countryId)
  {
     this._countryService.DeleteMarkets(Number(countryId)).subscribe(
       (value:any)=>
       {
         console.log('',value);
         this.messageAlert = value.status;
         if(value.status!=null) this.GetAllMarkets();
         if(value.status.startsWith('I'))
         this.alert = true;
         else
         this.warningAlert = true;
       }
     );
  }

  UpdateMarket(Country:Market)
  {
    this.selectMarket = Country;
    this.close();
    console.log(this.selectMarket.marketId);
  }

  UpdateMarketInformation(name)
  {
    this.selectMarket = {
      marketName:name,
      marketId:this.selectMarket.marketId
    }
    if(this.validationCheck(name))
    {
    this._countryService.UpdateMarketsDetails(this.selectMarket).subscribe((value:any)=>{
      console.log(value);
      this.messageAlert = value.status;
      if(value.status!=null) this.GetAllMarkets();
      if(value!=undefined)
      {
        if(value.status.includes('Successfully Updated'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
      }
     
      })
      this.message ='';
    }
      else{
        this.message = "All Fields must be filled.";
     }
  }

  close()
  {
    this.showfailedAlert = false;
    this.showConfirmAlert = false;
    this.messageAlert = '';
  }

}
