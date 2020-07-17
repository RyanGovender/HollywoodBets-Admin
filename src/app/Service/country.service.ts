import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Country } from '../Models/Country';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SportCountry } from '../Models/SportTree';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _http:HttpClient) { }

  private _apiUrl = 'https://localhost:44356/api/country';

  GetAllCountries()
  {
    return this._http.get<Observable<Country[]>>(this._apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  PostCountry(country:Country)
  {
    return this._http.post<Country>(`${this._apiUrl}/Post`,country)
    .pipe(
      catchError(this.handleError)
    );
  }

  DeleteCountry(countryId:number)
  {
    return this._http.delete<Country>(`${this._apiUrl}/Delete?countryId=${countryId}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateCountryDetails(Country:Country)
  {
    return this._http.put<Country>(`${this._apiUrl}/Put`,Country)
    .pipe(
      catchError(this.handleError)
    );
  }



  handleError(error: HttpErrorResponse){
    console.log(error);
      return of([]);
    }

}