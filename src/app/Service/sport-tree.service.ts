import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { SportTree, SportCountry, SportCountryViewModel, SportCountryModel } from '../Models/SportTree';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SportTreeService {

  constructor(private _http:HttpClient) { 

  }
  private _apiUrl = 'https://localhost:44356/api/SportTree'

  getAllSports()
  {
    return this._http.get<Observable<SportTree[]>>(`${this._apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  postToDatabase(SportTree:SportTree)
  {
    return this._http.post<SportTree>(`${this._apiUrl}/Post`,SportTree)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateSportTree(Sport:SportTree)
  {
    return this._http.put<SportTree>(`${this._apiUrl}/Put?sportId=${Sport.sportId}`,Sport).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteSportTreeItem(id)
  {
    return this._http.delete<SportTree>(`${this._apiUrl}/Delete?sportId=${id}`) .pipe(
      catchError(this.handleError)
    );
  }

  PostToSportCountry(SportCountry:SportCountry)
  {
     return this._http.post<SportCountry>(`${this._apiUrl}/AddSportCountryMapping`,SportCountry)
     .pipe(
       catchError(this.handleError)
     );
  }

  GetAllSportCountry()
  {
    return this._http.get<SportCountryViewModel>(`${this._apiUrl}/GetAllSportCountry`).pipe(
      catchError(this.handleError)
    );
  }

  UpdateSportCountry(sportCountry)
  {
    return this._http.put<SportCountryModel>(`${this._apiUrl}/PutSportCountry`,sportCountry).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
  console.log(error);
    return of(error.error);
  }

  
}
