import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Market, MarketBetType, MarketBetViewModel } from '../Models/Market';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

 
  constructor(private _http:HttpClient) { }

  private _apiUrl = 'https://localhost:44356/api/market';

  GetAllMarkets()
  {
    return this._http.get<Observable<Market[]>>(this._apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  PostMarkets(market:Market)
  {
    return this._http.post<Market>(`${this._apiUrl}/Post`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  DeleteMarkets(marketId:number)
  {
    return this._http.delete<Market>(`${this._apiUrl}/Delete?marketId=${marketId}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateMarketsDetails(market:Market)
  {
    return this._http.put<Market>(`${this._apiUrl}/Put`,market)
    .pipe(
      catchError(this.handleError)
    );
  }

  PostMarketBetType(marketBetType:MarketBetType)
  {
    return this._http.post<MarketBetType>(`${this._apiUrl}/AddMarketBetTypes`,marketBetType).pipe(
      catchError(this.handleError)
    );
  }

  GetAllMarketBets()
  {
    return this._http.get<MarketBetViewModel>(`${this._apiUrl}/GetMarketBetTypes`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
      return of([]);
    }

}
