import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BetType, TournamentBetType, TournamentBetTypeVW } from '../Models/BetType';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BettypeService {

  constructor(private _http:HttpClient) { }

  private _apiUrl = 'https://localhost:44356/api/BetType';

  GetAllTournament()
  {
    return this._http.get<Observable<BetType[]>>(this._apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  PostTournament(market:BetType)
  {
    return this._http.post<BetType>(`${this._apiUrl}/Post`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  DeleteTournament(marketId:number)
  {
    return this._http.delete<BetType>(`${this._apiUrl}/Delete?betTypeId=${marketId}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateTournamentDetails(market:BetType)
  {
    return this._http.put<BetType>(`${this._apiUrl}/Put`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  PostTournamentBetType(tournamentBetType:TournamentBetType)
  {
    return this._http.post<TournamentBetType>(`${this._apiUrl}/AddTournamentBetTypes`,tournamentBetType)
    .pipe(
      catchError(this.handleError)
    );
  }

  GetAllTournamentBetTypes()
  {
    return this._http.get<TournamentBetTypeVW>(`${this._apiUrl}/GetAllTournamentBetTypes`).pipe(
      catchError(this.handleError)
    );
  }
 
  handleError(error: HttpErrorResponse){
    console.log(error);
      return of(error.error);
    }
}
