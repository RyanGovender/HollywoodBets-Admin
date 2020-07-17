import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tournament, SportTournamentCountry, SportCountryTournamentVW } from '../Models/Tournament';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private _http:HttpClient) { }

  private _apiUrl = 'https://localhost:44356/api/tournament';

  GetAllTournament()
  {
    return this._http.get<Observable<Tournament[]>>(this._apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  PostTournament(market:Tournament)
  {
    return this._http.post<Tournament>(`${this._apiUrl}/Post`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  DeleteTournament(marketId:number)
  {
    return this._http.delete<Tournament>(`${this._apiUrl}/Delete?tournamentId=${marketId}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateTournamentDetails(market:Tournament)
  {
    return this._http.put<Tournament>(`${this._apiUrl}/Put`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  PostSportTournament(sportCountryTournament:SportTournamentCountry)
  {
    return this._http.post<SportTournamentCountry>(`${this._apiUrl}/AddSportTournamentCountry`,sportCountryTournament)
    .pipe(
      catchError(this.handleError)
    );
  }
 GetAllSportCountryTournament()
 {
   return this._http.get<SportCountryTournamentVW>(`${this._apiUrl}/GetAllSportTournmentCountries`)
   .pipe(
     catchError(this.handleError)
   );
 }
  

  handleError(error: HttpErrorResponse){
    console.log(error);
      return of(error.error);
    }
}
