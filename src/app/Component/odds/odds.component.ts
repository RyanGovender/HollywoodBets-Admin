import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/Service/event.service';
import { MarketBetViewModel } from 'src/app/Models/Market';
import { Odds } from 'src/app/Models/Odds';
import { Event } from 'src/app/Models/Event';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.css']
})
export class OddsComponent implements OnInit {

  constructor(private _eventService:EventService) { }

  @Input() eventsInput;

  events:any;
  marketBetType:any;
  oddsEvents:any;

  itemEvent:Event;
  itemMarketBetType;

  selectedEvent:Event;
  selectMarketBetTypeViewModel:MarketBetViewModel;

  messageAlert = false;
  message = '';
  createdObject:Odds;

  ngOnInit(): void {
   this.GetAllEvents();
   this.GetAllMarketBetTypes();
   this.GetAllOddsEvents();
  }

  GetAllEvents()
  {
    return this._eventService.GetAllEvents().subscribe(
      (data:any) =>{
        this.events = data;
        this.itemEvent = data[0].eventName;
        this.selectedEvent = data[0];
      }
    );
  }

  GetAllMarketBetTypes()
  {
    return this._eventService.GetAllMarketBetTypes().subscribe(
      (data:any)=>
      {
        this.marketBetType = data;
        this.itemMarketBetType = data[0].betTypeName +' - '+ data[0].marketName;
        this.selectMarketBetTypeViewModel = data[0];
      }
    )
  }

  GetAllOddsEvents()
  {
    return this._eventService.GetAllOdds().subscribe(
      (data:any)=>{
        this.oddsEvents = data;
      }
    )
  }

  SelectEvent(event)
  {
    this.selectedEvent = event;
    this.itemEvent = event.eventName;
  }

  SelectMarketBetType(mbt)
  {
    this.selectMarketBetTypeViewModel = mbt;
    this.itemMarketBetType = mbt.betTypeName + ' - ' + mbt.marketName;
  }

  PostOdds(value)
  {
    this.createdObject ={
       oddsId:0,
       marketBetTypeId:this.selectMarketBetTypeViewModel.marketBetTypeId,
       eventId:this.selectedEvent.eventId,
       oddsValue:Number(value)
    };

    this._eventService.PostOdds(this.createdObject).subscribe(
      (data:any)=>{
        this.messageAlert = true;
        if(data!=undefined)
        {
           this.message = data.status;
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
