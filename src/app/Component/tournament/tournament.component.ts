import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/Models/Tournament';
import { TournamentService } from 'src/app/Service/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  countries:any;
  country:Tournament;
  showConfirmAlert= false;
  showfailedAlert = false;
  alert = false;
  warningAlert = false;
  messageAlert ='';
  message = '';
  selectTournament: Tournament ={
    tournamentId:0,
    tournamentName:''
  };

  constructor(private _tournamentService:TournamentService) { }

  ngOnInit(): void {
    this.GetAllTournament();
  }

  GetAllTournament()
  {
    return this._tournamentService.GetAllTournament().subscribe((data)=>{
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


  AddToTournament(name)
  {
    this.close();
    this.country = {
      tournamentId:0,
      tournamentName:name
    };
 if(this.validationCheck(name))
 {
  this._tournamentService.PostTournament(this.country).subscribe(
    (value:any)=>{
    if(value.status.startsWith('S'))
    this.showConfirmAlert = true;
    else
    this.showfailedAlert = true;
    this.GetAllTournament();
    }
  );
  this.message = '';
 }
 else{
   this.message = 'All fields must be filled.';
 }
    
  }

  DeleteTournament(countryId)
  {
     this._tournamentService.DeleteTournament(Number(countryId)).subscribe(
       (value:any)=>
       {
         console.log('',value);
         this.messageAlert = value.status;
         if(value.status!=null) this.GetAllTournament();
         if(value.status.startsWith('I'))
         this.alert = true;
         else
         this.warningAlert = true;
       }
     );
  }

  UpdateTournament(Country:Tournament)
  {
    this.selectTournament = Country;
    this.close();
    console.log(this.selectTournament);
  }

  UpdateTournamentInformation(name)
  {
    this.selectTournament = {
      tournamentName:name,
      tournamentId:this.selectTournament.tournamentId
    }
    if(this.validationCheck(name))
    {
    this._tournamentService.UpdateTournamentDetails(this.selectTournament).subscribe((value:any)=>{
      console.log(value);
      this.messageAlert = value.status;
      if(value.status!=null) this.GetAllTournament();
      if(value!=undefined )
      {
        if(value.status.includes('Successfully Updated'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
      }
     
      })
      this.message = '';
 }
 else{
   this.message = 'All fields must be filled.';
 }
  }

  close()
  {
    this.showfailedAlert = false;
    this.showConfirmAlert = false;
    this.messageAlert = '';
  }


}
