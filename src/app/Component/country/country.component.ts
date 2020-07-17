import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/Models/Country';
import { CountryService } from 'src/app/Service/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries:any;
  country:Country;
  showConfirmAlert= false;
  showfailedAlert = false;
  alert = false;
  warningAlert = false;
  messageAlert ='';
  message ='';
  
  selectCountry: Country ={
    countryId:0,
    countryName:'',
    iconCode:''
  };

  constructor(private _countryService:CountryService) { }

  ngOnInit(): void {
    this.GetAllCountries();
  }

  GetAllCountries()
  {
    return this._countryService.GetAllCountries().subscribe((data)=>{
      this.countries = data;
    });
  }

  validationCheck(name:string,code:string)
  {
     if(name==="" || code==="")
     {
       return false
     }
     return true;
  }


  AddToCountry(name,code)
  {
    this.country = {
      countryId:0,
      countryName:name,
      iconCode:code
    };
    if(this.validationCheck(name,code)){
    this._countryService.PostCountry(this.country).subscribe(
      (value:any)=>{

      if(value.status.startsWith('S'))
      this.showConfirmAlert = true;
      else
      this.showfailedAlert = true;

      this.GetAllCountries();
      this.message = '';
      }
    );}
    else{
       this.message = 'Insure all fields are filled.';
    }
  }

  DeleteCountry(countryId)
  {
     this._countryService.DeleteCountry(Number(countryId)).subscribe(
       (value:any)=>
       {
         console.log('',value);
         this.messageAlert = value.status;
         if(value.status!=null) this.GetAllCountries();
         if(value.status.startsWith('I'))
         this.alert = true;
         else
         this.warningAlert = true;
       }
     );
  }

  UpdateCountries(Country:Country)
  {
    this.selectCountry = Country;
    console.log(this.selectCountry.countryName);
  }

  UpdateCountryInformation(name,code)
  {
    this.selectCountry = {
      countryName:name,
      countryId:this.selectCountry.countryId,
      iconCode:code
    }

    if(this.validationCheck(name,code))
    {
      this._countryService.UpdateCountryDetails(this.selectCountry).subscribe((value:any)=>{
        console.log(value);
        this.messageAlert = value.status;
        if(value.status!=null) this.GetAllCountries();
        if(value.status.includes('Successfully Updated'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
        });
        this.message = '';
    }
    else
    {
      this.message = 'All fields must be filled';
    }
    
  }

  close()
  {
    this.showfailedAlert = false;
    this.showConfirmAlert = false;
  }

}
