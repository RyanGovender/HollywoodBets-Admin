import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Service/event.service';
import { TournamentService } from 'src/app/Service/tournament.service';
import { Tournament } from 'src/app/Models/Tournament';
import { Event } from 'src/app/Models/Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events:any;
  tour:Tournament[];
  tournaments:any;
  selectedTournament:Tournament;
  createdEvent:Event;
  itemOne;
  showConfirmAlert= false;
  showfailedAlert = false;
  alert = false;
  warningAlert = false;
  messageAlert ='';
  
  currentEvent:Event = {
    eventId :0,
    eventDate:new Date(),
    eventName:'',
    tournamentId:0
  };

  constructor(private _eventService:EventService,private _tournamentService:TournamentService) { }

  ngOnInit(): void {
    this.GetAllEvents();
    this.GetAllTournaments();
  }

  GetAllEvents()
  {
    return this._eventService.GetAllEvents().subscribe(
      (data:any) =>{
        this.events = data;
      }
    )
  }

  GetAllTournaments()
  {
    return this._tournamentService.GetAllTournament().subscribe(
      (data:any)=>{
        this.tournaments = data;
        this.itemOne = data[0].tournamentName
        this.selectedTournament = data[0]
      }
    )
  }

  AddEvent(date,name)
  {
    this.createdEvent ={
      eventId:0,
      eventName:name,
      eventDate:date,
      tournamentId:this.selectedTournament.tournamentId
    }
    
    this._eventService.PostEvent(this.createdEvent).subscribe(
    (value:any)=>{
      if(value!=undefined)
      {
        this.messageAlert = value.status;
        if(value.status.startsWith('S'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
      }
      this.GetAllEvents();
    }
    )
  }

  GetTournament(tournament)
  {
    this.selectedTournament = tournament;
    this.itemOne = this.selectedTournament.tournamentName;
  }

  UpdateEvent(event)
  {
    this.currentEvent = event;
    const number = Number(event.tournamentId);
    this.itemOne = this.tournaments.filter(x=>x.tournamentId == number)[0].tournamentName;
  }
  validationCheck(name:string,eventDate)
  {
     if(name==="")
     {
       return false
     }
     return true;
  }

  UpdateEvents(eventName,eventDate)
  {
    this.createdEvent = {
      eventId : this.currentEvent.eventId,
      eventName :eventName,
      eventDate: eventDate,
      tournamentId : this.selectedTournament.tournamentId
    }

    this._eventService.UpdateEventDetails(this.createdEvent).subscribe(
      (value:any)=>{
        console.log(value);
        if(value.status!=null) this.GetAllEvents();
      if(value!=undefined )
      {
        this.messageAlert = value.status;
        if(value.status.includes('Successfully Updated'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
      }
      }
    );

    
  }
  close()
  {
    this.showfailedAlert = false;
    this.showConfirmAlert = false;
    this.messageAlert = '';
  }

  DeleteBetType(countryId)
  {
     this._eventService.DeleteEvent(Number(countryId)).subscribe(
       (value:any)=>
       {
         console.log('',value);
         if(value.status!=null) this.GetAllEvents();
         if(value!=undefined)
         {
          this.messageAlert = value.status;
          if(value.status.startsWith('I'))
          this.alert = true;
          else
          this.warningAlert = true;
         }
         else
         {
           this.warningAlert = true;
         }
       }
     );
  }
}
