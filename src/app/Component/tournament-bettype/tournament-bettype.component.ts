import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from 'src/app/Service/tournament.service';
import { BettypeService } from 'src/app/Service/bettype.service';
import { Tournament } from 'src/app/Models/Tournament';
import { BetType, TournamentBetType } from 'src/app/Models/BetType';

@Component({
  selector: 'app-tournament-bettype',
  templateUrl: './tournament-bettype.component.html',
  styleUrls: ['./tournament-bettype.component.css']
})
export class TournamentBettypeComponent implements OnInit {

  @Input() betTypeInput:any;
  
  tournaments:any;
  betType:any;
  tournamentBetTypes:any;

  tournamentItem:Tournament;
  betTypeItem:BetType;

  selectedTournament:Tournament;
  selectedBetType:BetType;

  messageAlert = false;
  message = '';
  createdObject:TournamentBetType;

  constructor(private _tournamentService:TournamentService,private betTypeService:BettypeService) { }

  ngOnInit(): void {
    this.GetAllBetTypes();
    this.GetAllTournaments();
    this.GetAllTournamentBetTypes();
  }

  GetAllTournaments()
  {
    return this._tournamentService.GetAllTournament().subscribe(
      (value:any)=>{
        this.tournaments = value;
        this.tournamentItem = value[0].tournamentName;
        this.selectedTournament = value[0];
      }
    );
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

  GetAllTournamentBetTypes()
  {
    return this.betTypeService.GetAllTournamentBetTypes().subscribe(
      (value:any)=>{
        this.tournamentBetTypes = value;
      }
    )
  }

  SelectTournament(tournament)
  {
    this.selectedTournament = tournament;
    this.tournamentItem = tournament.tournamentName;
  }

  SelectBetType(betType)
  {
    this.selectedBetType = betType;
    this.betTypeItem = betType.betTypeName;
  }

 PostBetTypeTournament()
 {
    this.createdObject ={
      tournamentId:this.selectedTournament.tournamentId,
      betTypeId:this.selectedBetType.betTypeId
    }

    this.betTypeService.PostTournamentBetType(this.createdObject).subscribe(
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
    );
 }
 close()
  {
    this.messageAlert = false;
    this.message ='';
  }

}
