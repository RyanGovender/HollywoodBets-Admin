import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../Models/Event';
import { MarketBetViewModel } from '../Models/Market';
import { Odds, OddsViewModel } from '../Models/Odds';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  constructor(private _http:HttpClient) { }

  private _apiUrl = 'https://localhost:44356/api/Event';

  GetAllEvents()
  {
    return this._http.get<Observable<Event[]>>(this._apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  PostEvent(market:Event)
  {
    return this._http.post<Event>(`${this._apiUrl}/Post`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  DeleteEvent(marketId:number)
  {
    return this._http.delete<Event>(`${this._apiUrl}/Delete?eventId=${marketId}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateEventDetails(market:Event)
  {
    return this._http.put<Event>(`${this._apiUrl}/Put`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  GetAllMarketBetTypes(){
    return this._http.get<Observable<MarketBetViewModel[]>>(`https://localhost:44356/api/market/GetMarketBetTypes`)
    .pipe(
      catchError(this.handleError)
    );
    
  }

  PostOdds(odds:Odds)
  {
    return this._http.post<Odds>(`${this._apiUrl  }/AddOdds`,odds)
    .pipe(
      catchError(this.handleError)
    );
  }

  GetAllOdds()
  {
    return this._http.get<OddsViewModel>(`${this._apiUrl}/GetAllOdds`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
      return of(error.error);
    }
}
