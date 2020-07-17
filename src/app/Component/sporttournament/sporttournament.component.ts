import { Component, OnInit, Input } from '@angular/core';
import { CountryService } from 'src/app/Service/country.service';
import { SportTreeService } from 'src/app/Service/sport-tree.service';
import { SportTree } from 'src/app/Models/SportTree';
import { Country } from 'src/app/Models/Country';
import { Tournament, SportTournamentCountry } from 'src/app/Models/Tournament';
import { TournamentService } from 'src/app/Service/tournament.service';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-sporttournament',
  templateUrl: './sporttournament.component.html',
  styleUrls: ['./sporttournament.component.css']
})
export class SporttournamentComponent implements OnInit {

  @Input() tournamentInput:any;

  sports:any;
  countries:any;
  tournaments:any;
  sportTournament:any;

  sportItemOne:SportTree;
  countryItem:Country;
  tournamentItem:Tournament;

  selectedSport:SportTree;
  selectedCountry:Country;
  selectedTournament:Tournament;

  createdObject:SportTournamentCountry;
  messageAlert = false;
  message = '';
  
  constructor(private _sportService:SportTreeService,private _countryService:CountryService,private _tournamentService:TournamentService) { }

  ngOnInit(): void {
    this.GetAllCountries();
    this.GetAllSports();
    this.GetAllTournaments();
    this.GetAllSportTournamentCountries();
  }

  GetAllSports()
  {
    return this._sportService.getAllSports().subscribe(
    (value:any)=>
    {
      this.sports = value;
      this.sportItemOne = value[0].sportName;
      this.selectedSport = value[0];
    }
    );
  }

  GetAllCountries()
  {
    return this._countryService.GetAllCountries().subscribe(
      (value:any)=>{
      this.countries = value;
      this.countryItem = value[0].countryName;
      this.selectedCountry = value[0];
      }
    );
  }

  GetAllTournaments()
  {
    return this._tournamentService.GetAllTournament().subscribe(
      (value:any)=>{
        this.tournaments = value;
        this.tournamentItem = value[0].tournamentName;
        this.selectedTournament = value[0];
      }
    )
  }

  GetAllSportTournamentCountries()
  {
    return this._tournamentService.GetAllSportCountryTournament().subscribe(
      (value:any)=>{
        this.sportTournament = value;
      }
    )
  }

  SelectSport(sport)
  {
    this.selectedSport = sport;
    this.sportItemOne = sport.sportName;
  }

  SelectCountry(country)
  {
    this.selectedCountry = country;
    this.countryItem = country.countryName;
  }

  SelectTournament(tournament)
  {
    this.selectedTournament = tournament;
    this.tournamentItem = tournament.tournamentName;
  }

  PostSportCountryTournament()
  {
    this.createdObject ={
      sportId:this.selectedSport.sportId,
      countryId:this.selectedCountry.countryId,
      tournamentId:this.selectedTournament.tournamentId
    }

    this._tournamentService.PostSportTournament(this.createdObject).subscribe(
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
